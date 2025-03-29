import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Card as MuiCard } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          cursor: "pointer",
          boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
          overflow: "unset",
        }}
      >
        <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
          <Typography>Card Test 01</Typography>
        </CardContent>
      </MuiCard>
    );
  }
  return (
    <MuiCard
      sx={{
        cursor: "pointer",
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        overflow: "unset",
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/484774516_1812310886286635_2228981112631681889_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEIiVYAxorbjCvbYD2aC5aC0zc4iyYza0DTNziLJjNrQERCwwjSHn5TOpYiFxwK32_0hE_Y9oqH04fIluhRFtKr&_nc_ohc=bEZaMreVpKUQ7kNvgFJsw1P&_nc_oc=Adm6BM7smfkQAmhNlrOof6-AbLup7B-9cv0WcRUGVGVwlmWZo-C0F483gfGYLe72hQU1HRU_lptaIFhWv7I0Ra4H&_nc_zt=23&_nc_ht=scontent.fsgn8-3.fna&_nc_gid=uH6mLyrV_9Rh9mMIME5C5w&oh=00_AYE7LfQovGYJ7T-qmOJ_jg3sYUCrY-v2W0Yy6tMJ_aGTIg&oe=67E751DF"
        title="green iguana"
      />
      <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
        <Typography>HWINK</Typography>
      </CardContent>
      <CardActions sx={{ p: "0 4px 8px 4px" }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          10
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default Card;
