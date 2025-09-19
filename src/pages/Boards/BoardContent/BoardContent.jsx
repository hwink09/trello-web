import { useEffect, useState, useCallback, useRef } from "react";

import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";

import {
  DndContext,
  // PointerSensor
  // TouchSensor,
  // MouseSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  getFirstCollision,
  pointerWithin,
} from "@dnd-kit/core";
import { MouseSensor, TouchSensor } from "~/customLibs/DndKitSensors";

import { arrayMove } from "@dnd-kit/sortable";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "~/utils/formatters";

import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

const ACTIVE_DRAGITEM_TYPE = {
  COLUMN: "ACTIVE_DRAGITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAGITEM_TYPE_CARD",
};
function BoardContent({
  board,
  createNewColumn,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
}) {
  // https://docs.dndkit.com/api-documentation/sensors

  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  // Yêu cầu chuột di chuyển 10px thì mới thực hiện event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });
  // Nhấn giữ 250ms và dung sai của cảm ứng (dễ hiểu là di chuyển/ chênh lệch 5px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumns, setOrderedColumns] = useState([]);

  // Cùng một thời điểm thì chỉ có một phần tử được kéo thả (column hoặc card)
  const [activeDragItemId, setActiveDragItemId] = useState(null);
  const [activeDragItemType, setActiveDragItemType] = useState(null);
  const [activeDragItemData, setActiveDragItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);

  // Điểm va chạm cuối cùng của phần tử đang kéo
  const lastOverId = useRef(null);

  useEffect(() => {
    setOrderedColumns(board.columns);
  }, [board]);

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) =>
      // Lưu ý. Nên dùng c.cards thay vì c.cardOrderIds bởi vì ở bước handleDragOver mình sẽ làm dữ liệu cho cars hoàn chỉnh trước rồi mới tạo ra cardOrderIds mới
      column?.cards?.map((card) => card._id)?.includes(cardId)
    );
  };

  // Function chung xử lí việc cập nhật lại state trong trường hợp di chuyển card giữa các column khác nhau
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns((prevColumns) => {
      // Tìm vị trí (index) của overCard trong column đích (nơi card sắp được nhả )
      const overCardIndex = overColumn?.cards?.findIndex(
        (card) => card._id === overCardId
      );

      // Logic tính toán cho "carđInex mới" (trên hoặc dưới của overCard)
      let newCardIndex;

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;

      const modifier = isBelowOverItem ? 1 : 0;
      newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn?.cards?.length + 1;

      // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lí data rồi return - cập nhật lại OrderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns);

      const nextActiveColumn = nextColumns.find(
        (c) => c._id === activeColumn._id
      );

      const nextOverColumn = nextColumns.find((c) => c._id === overColumn._id);

      if (nextActiveColumn) {
        // Xóa card ở column active (cũ, cái lúc mà kéo card ra khỏi nó để sang column mới)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Thêm Placeholder Card nếu column rỗng: Bị kéo hết card đi, không còn cái card nào
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

        // Xóa placeholder card đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        // Cập nhật lại cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
          (card) => card._id
        );
      }

      if (nextOverColumn) {
        // Kiểm tra xem card có tồn tại trong overColumn không, nếu có thì xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau
        const rebuild_activeDragingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        // Tiếp theo là thêm card vào overColumn theo vị trí index mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDragingCardData
          // {
          //   ...activeDraggingCardData,
          //   columnId: nextOverColumn._id,
          // }
        );

        // Cập nhật lại cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card) => card._id
        );
      }

      return nextColumns;
    });
  };

  // Trigger bắt đầu kéo (drag) một phần tử
  const handleDragStart = (event) => {
    // console.log("handleDragStart:", event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAGITEM_TYPE.CARD
        : ACTIVE_DRAGITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    // Nếu kéo thả card thì lưu lại column cũ để xử lí logic sau này
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event) => {
    // Trigger trong quá trình kéo (drag) một phần tử
    // console.log("handleDragOver:", event);
    // Không làm gì cả nêu đang kéo (drag) một phần tử là column
    if (activeDragItemType === ACTIVE_DRAGITEM_TYPE.COLUMN) return;
    const { active, over } = event;
    // nếu không tồn tại over || active (Kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over || !active) return;

    // acticeDraggingCard là card đang được kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    // overCard là cái card mà chúng ta được tương tác trên hoặc dưới so với card đang kéo ở trên
    const { id: overCardId } = over;

    // Tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);
    // Nếu không tìm thấy column nào thì return luôn
    if (!activeColumn || !overColumn) return;

    // Xử lí logic ở đây chỉ khi kéo card qua 2 column khác nhau, còn nếu không thì không làm gì
    // Đây đang là đoạn xử lí lúc kéo (handleDragOver), còn xử lí lúc kéo xong xuôi thì nó là vấn đề ở handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      );
    }
  };

  //Trigger khi kết thúc hành động kéo (drag) một phần tử => thả (drop)
  const handleDragEnd = (event) => {
    // console.log("handleDragEnd:", event);
    const { active, over } = event;
    // Kiểm tra nếu không tồn tại over (Kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!active || !over) return;

    // Xử lí kéo thả Cards
    if (activeDragItemType === ACTIVE_DRAGITEM_TYPE.CARD) {
      // acticeDraggingCard là card đang được kéo
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      // overCard là cái card mà chúng ta được tương tác trên hoặc dưới so với card đang kéo ở trên
      const { id: overCardId } = over;

      // Tìm 2 column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);
      // Nếu không tìm thấy column nào thì return luôn
      if (!activeColumn || !overColumn) return;

      // Hành động kéo thả card qua 2 column khác nhau
      // Phải dùng activDragItemData.columnId hoặc oldColumnWhenDraggingCard._id (set vào state từ bước handleDragStart)chứ không phải activData trong scope handleDragEnd này vì sau khi đi qua onDragOver tới đây là state của card đã bị thay đổi rồi.
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //Hành động kéo thả card qua 2 column khác nhau
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        );
      } else {
        //Hành động kéo thả card trong cùng một column

        // Lấy vị trí cũ từ oldColumnWhenDraggingCard
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c) => c._id === activeDragItemId
        );
        // Lấy vị trí mới từ overColumn
        const newCardIndex = overColumn?.cards?.findIndex(
          (c) => c._id === overCardId
        );

        // Dùng arrayMove vì kéo card trong cùng một column có logic giống như kéo column trong boardContent
        const dndOrderedCard = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        const dndOrderedCardIds = dndOrderedCard.map((card) => card._id);

        setOrderedColumns((prevColumns) => {
          // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lí data rồi return - cập nhật lại OrderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns);

          // Tìm column mà ta đang kéo thả
          const targetColumn = nextColumns.find(
            (c) => c._id === overColumn._id
          );

          // Cập nhật lại 2 giá trị mới là card và cardOrderIds trong targetColumn
          targetColumn.cards = dndOrderedCard;
          targetColumn.cardOrderIds = dndOrderedCardIds;

          // Trả về giá trị state mới (chuẩn vị trí)
          return nextColumns;
        });

        // Gọi lên props func moveCardInTheSameColumn nằm ở component cha cao nhất (board/_id.jsx)
        moveCardInTheSameColumn(
          dndOrderedCard,
          dndOrderedCardIds,
          oldColumnWhenDraggingCard._id
        );
      }
    }

    // Xử lí kéo thả Columns trong boardContent
    if (activeDragItemType === ACTIVE_DRAGITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        // Lấy vị trí cũ từ active
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        );
        // Lấy vị trí mới từ over
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        );
        // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
        // Code của arrayMove ở đây: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );

        // vẫn gọi update State ở đây để tránh delay hoặc Flickering giao diện lúc kéo thả cần phải chờ gọi API (small trick)
        setOrderedColumns(dndOrderedColumns);

        // Gọi props func moveColumns nằm ở component cha cao nhất (board/_id.jsx
        moveColumns(dndOrderedColumns);
      }
    }

    // Reset lại các giá trị state sau khi kéo thả xong
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
  };

  // Animation kéo thả (drag) cho các phần tử - Test bằng cách kéo thả các column và nhìn phần tử giữ chỗ Overlay
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: { opacity: 0.5 },
      },
    }),
  };

  // args: arguments = các đối số, tham số
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAGITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      const pointerIntersection = pointerWithin(args);

      // nếu pointerIntersection là mảng rỗng, return luôn không cần làm gì cả
      if (!pointerIntersection?.length) return;

      // Thuật toán phát hiện va chạm sẽ trả về một mảng các va chạm ở đây (ko cần bước này nữa)
      // const intersections =
      //   pointerIntersection?.length > 0
      //     ? pointerIntersection
      //     : rectIntersection(args);

      // Tìm over ID đầu tiên trong các va chạm (intersections)
      let overID = getFirstCollision(pointerIntersection, "id");
      if (overID) {
        const checkColumn = orderedColumns.find((c) => c._id === overID);
        if (checkColumn) {
          overID = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container) => {
                return (
                  container.id !== overID &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }

        lastOverId.current = overID;
        return [{ id: overID }];
      }
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColumns]
  );

  return (
    <DndContext
      sensors={sensors}
      // Update: nếu chỉ dùng closestCorners sẽ có bug flickering + sai lệch dữ liệu
      //collisionDetection={closestCorners} //Thuật toán phát hiện va chạm

      // tự custom collisionDetectionStrategy để tránh lỗi flickering
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
        />
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}

          {activeDragItemType === ACTIVE_DRAGITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}

          {activeDragItemType === ACTIVE_DRAGITEM_TYPE.CARD && (
            <Card card={activeDragItemData} />
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BoardContent;
