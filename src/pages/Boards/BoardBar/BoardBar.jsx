import Box from "@mui/material/Box";

import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MENU_STYLES = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};
function BoardBar() {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trello.boardBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }} gap={1}>
        <Chip
          sx={MENU_STYLES}
          icon={<DashboardIcon />}
          label="Hwink - MERN Stack Board"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<ElectricBoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }} gap={1}></Box>
      <Button
        variant="outlined"
        startIcon={<PersonAddIcon />}
        sx={{
          color: "white",
          borderColor: "white",
          "&:hover": { borderColor: "white" },
        }}
      >
        Invite
      </Button>

      <AvatarGroup
        max={3}
        sx={{
          gap: "10px",
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            fontSize: 16,
            border: "none",
            color: "white",
            cursor: "pointer",
            "&:first-of-type": { bgcolor: "#a4b0be" },
          },
        }}
      >
        <Tooltip title="hwink">
          <Avatar
            alt="hwink"
            src="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/484774516_1812310886286635_2228981112631681889_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEIiVYAxorbjCvbYD2aC5aC0zc4iyYza0DTNziLJjNrQERCwwjSHn5TOpYiFxwK32_0hE_Y9oqH04fIluhRFtKr&_nc_ohc=bEZaMreVpKUQ7kNvgFJsw1P&_nc_oc=Adm6BM7smfkQAmhNlrOof6-AbLup7B-9cv0WcRUGVGVwlmWZo-C0F483gfGYLe72hQU1HRU_lptaIFhWv7I0Ra4H&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=uH6mLyrV_9Rh9mMIME5C5w&oh=00_AYE7LfQovGYJ7T-qmOJ_jg3sYUCrY-v2W0Yy6tMJ_aGTIg&oe=67E751DF"
          />
        </Tooltip>
      </AvatarGroup>
    </Box>
  );
}

export default BoardBar;
