import Button from "@mui/material/Button";
import ThreeDRotation from "@mui/icons-material/ThreeDRotation";
import AccessAlarm from "@mui/icons-material/AccessAlarm";
import HomeIcon from "@mui/icons-material/Home";
import { pink } from "@mui/material/colors";

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  useColorScheme,
} from "@mui/material/styles";

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <Button
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
        // localStorage.setItem("trello-dark-light-mode");
        // localStorage.getItem("trello-dark-light-mode");
      }}
    >
      {mode === "light" ? "turn Dark" : "turn Light"}
    </Button>
  );
}

function App() {
  return (
    <>
      <ModeToggle />
      <br />
      <div>hwink</div>
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <br />
      <AccessAlarm />
      <ThreeDRotation />
      <HomeIcon color="primary" />
      <HomeIcon color="secondary" />
      <HomeIcon color="success" />
      <HomeIcon color="action" />
      <HomeIcon color="disabled" />
      <HomeIcon sx={{ color: pink[500] }} />
    </>
  );
}

export default App;
