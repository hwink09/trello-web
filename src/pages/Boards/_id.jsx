import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar.jsx";
import BoardBar from "./BoardBar/BoardBar";
import BoxContent from "./BoardContent/BoardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { mapOrder } from "~/utils/sorts";

import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
} from "~/apis";
import { generatePlaceholderCard } from "~/utils/formatters";
import { isEmpty } from "lodash";

// import { mockData } from "~/apis/mock-data";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "68b55a67bf6162a3ed544944";
    // Call api
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Sắp xếp thứ tự các column ở đây luôn trước khi đưa xuống bên dưới
      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

      // xử lí vấn đề kéo vào một column rỗng
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });
      setBoard(board);
    });
  }, []);

  // gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    // Khi tạo Column mới thì nó cũng chưa có card nên cũng cần xử lí vấn đề kéo thả vào một column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    // Cập nhật state board
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };

  // gọi API tạo mới Card và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    // Cập nhật state board
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard);
      columnToUpdate.cardOrderIds.push(createdCard._id);
    }
    setBoard(newBoard);
  };

  /**
   * Khi gọi API và xử lí khi đã kéo thả xong xuôi
   * chỉ cần gọi API để cập nhật mảng columnOrderIds của board chứa nó
   * */
  const moveColumns = (dndOrderedColumns) => {
    // update cho chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns?.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

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
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === columnId
    );
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCard;
      columnToUpdate.cardOrderIds = dndOrderedCardIds;
    }
    setBoard(newBoard);

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
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // Gọi API xử lí phía BE
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: dndOrderedColumns.find((c) => c._id === prevColumnId)
        ?.cardOrderIds,
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
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
      />
    </Container>
  );
}

export default Board;
