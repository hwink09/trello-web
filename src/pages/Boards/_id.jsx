import { useEffect } from "react";
import { cloneDeep } from "lodash";

import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import AppBar from "~/components/AppBar/AppBar.jsx";
import BoardBar from "./BoardBar/BoardBar";
import BoxContent from "./BoardContent/BoardContent";

import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
} from "~/apis";

import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";

import { useDispatch, useSelector } from "react-redux";

function Board() {
  const dispatch = useDispatch();
  // Không dùng State của component nữa mà dùng state của Redux
  const board = useSelector(selectCurrentActiveBoard);

  useEffect(() => {
    const boardId = "68b55a67bf6162a3ed544944";
    // Call api
    dispatch(fetchBoardDetailsAPI(boardId));
  }, [dispatch]);

  /**
   * Khi gọi API và xử lí khi đã kéo thả xong xuôi
   * chỉ cần gọi API để cập nhật mảng columnOrderIds của board chứa nó
   * */
  const moveColumns = (dndOrderedColumns) => {
    // update cho chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns?.map((c) => c._id);

    //Trường hợp dùng Spread Operator này thì không bị sao bởi vì không dùng push như ở trên làm thay đổi trực tiếp kiểu mở rộng mảng mà chỉ gán lại toàn bộ giá trị của column và columnOrderIds bằng 2 mảng mới.
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    dispatch(updateCurrentActiveBoard(newBoard));

    // Gọi api update Board
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };

  /**
   * Khi di chuyển card trong cùng column:
   * chỉ cần gọi API để cập nhật mảng cardOrderIds của column chứa nó
   * */
  const moveCardInTheSameColumn = (
    dndOrderedCard,
    dndOrderedCardIds,
    columnId
  ) => {
    // update cho chuẩn dữ liệu state board
    // Cannot assign to read only property 'card' of object
    // Trường họp Immutability ở đây đụng tới giá trị cards đang được coi là read only - (nested object - can thiệp sâu dữ liệu)
    const newBoard = cloneDeep(board);
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCard;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    dispatch(updateCurrentActiveBoard(newBoard));

    // Gọi api update Board
    updateColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds });
  };

  /**
   * Khi di chuyển card sang column khác
   * B1: cập nhật mảng cardOrderIds của Column ban đầu chứa nó (xóa _id của Card ra khỏi mảng)
   * B2: Cập nhật mảnh CardOrderIds của Column tiếp theo (thêm _id của Card vào mảng)
   * B3: Cập nhật lại trường columnId mới của cái card đã kéo
   * => làm một API support riêng
   * */
  const moveCardToDifferentColumn = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    // update cho chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns?.map((c) => c._id);
    // Tương tụ đoạn xử lí chỗ hàm moveColumns nên không ảnh hưởng Redux Toolkit Immutability
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    dispatch(updateCurrentActiveBoard(newBoard));

    // Gọi API xử lí phía BE
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id === prevColumnId
    )?.cardOrderIds;
    // Xử lí vấn đề khi kéo card cuối cùng ra khỏi column, column rỗng sẽ có placeholder-card, cần xóa nó đi trước khi gửi cho BE
    if (prevCardOrderIds[0]?.includes("placeholder-card"))
      prevCardOrderIds = [];

    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoxContent
        board={board}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  );
}

export default Board;
