import Container from "@mui/material/Container";

import AppBar from "~/components/AppBar/AppBar.jsx";
import BoardBar from "./BoardBar/BoardBar";
import BoxContent from "./BoardContent/BoardContent";
import { mockData } from "~/apis/mock-data";

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar board={mockData?.board} />
      <BoxContent board={mockData?.board} />
    </Container>
  );
}

export default Board;
