import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar.jsx";
import BoardBar from "./BoardBar/BoardBar";
import BoxContent from "./BoardContent/BoardContent";
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
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
      // xử lí vấn đề kéo vào một column rỗng
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
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

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={board} />
      <BoxContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  );
}

export default Board;
