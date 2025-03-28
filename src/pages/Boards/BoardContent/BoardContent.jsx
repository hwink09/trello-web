import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";

import {
  DndContext,
  PointerSensor,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

function BoardContent({ board }) {
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

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
  }, [board]);

  const handleDragEnd = (event) => {
    // console.log("handleDragEnd:", event);
    const { active, over } = event;
    // Kiểm tra nếu không tồn tại over (Kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    // if (!over) return;
    if (!over || active.id === over.id) return;

    // Lấy vị trí cũ từ active
    const oldIndex = orderedColumns.findIndex((c) => c._id === active.id);
    // Lấy vị trí mới từ over
    const newIndex = orderedColumns.findIndex((c) => c._id === over.id);
    // Dùng arrayMove của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
    // Code của arrayMove ở đây: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
    const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex);
    // 2 cái clg dữ liệu này sau dùng để xử lí gọi API
    // const dndOrderedColumnsIds = dndOrderedColumns?.map((c) => c._id);
    // console.log("dndOrderedColumns", dndOrderedColumns);
    // console.log("dndOrderedColumnsIds", dndOrderedColumnsIds);

    setOrderedColumns(dndOrderedColumns);
  };
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.trello.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  );
}

export default BoardContent;
