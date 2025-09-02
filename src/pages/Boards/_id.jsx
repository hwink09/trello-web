import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "~/components/AppBar/AppBar.jsx";
import BoardBar from "./BoardBar/BoardBar";
import BoxContent from "./BoardContent/BoardContent";
import { fetchBoardDetailsAPI } from "~/apis";
import { mockData } from "~/apis/mock-data";

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "68b55a67bf6162a3ed544944";
    // Call api
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board);
    });
  }, []);

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData.board} />
      <BoxContent board={mockData.board} />
    </Container>
  );
}

export default Board;
