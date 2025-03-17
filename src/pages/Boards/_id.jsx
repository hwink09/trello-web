import Container from "@mui/material/Container";

import AppBar from "../../components/AppBar";
import BoardBar from "./Boards/BoardBar";
import BoxContent from "./Boards/BoardContent";

function Board() {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      <AppBar />
      <BoardBar />
      <BoxContent />
    </Container>
  );
}

export default Board;
