import {
  Avatar,
  Box,
  Paper,
  ThemeProvider,
  Tooltip,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowLeft, ArrowRight, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useUserInfoEffect from "./getUserInfo";
import { useStateProvider } from "../utils/StateProvider";
import { Drawer } from "./Drawer";
import { SongBody } from "./SongBody";

const theme = createTheme({
  typography: {
    fontFamily: "Figtree, sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#111",
          color: "lightgrey",
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: "#232324",
          margin: "7px",
          fontSize: "17px",
          cursor: "pointer",
          ":hover": {
            backgroundColor: "#282828",
          },
        },
      },
    },
  },
});

function Dashboard() {
  const isFHD = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");
  const isMobile = useMediaQuery("(max-width: 1919px)");
  const [{ token, userInfo }] = useStateProvider();
  useUserInfoEffect(token);

  return (
    <ThemeProvider theme={theme}>
      <Drawer />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "20%",
          width: "100%",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          padding: "12px",
        }}
      >
        <ArrowLeft fontSize="large" sx={{ cursor: "pointer" }} />
        <ArrowRight fontSize="large" sx={{ cursor: "pointer" }} />
      </Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "90%",
          gap: "10px",
          width: "100%",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          padding: "12px",
        }}
      >
        <Link
          to="/notifications"
          style={{ textDecoration: "none", color: "lightgrey" }}
        >
          <Notifications fontSize="medium" sx={{ cursor: "pointer" }} />
        </Link>
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "lightgrey" }}
        >
          <Tooltip title={userInfo?.userName} placement="bottom">
            <Avatar
              src={userInfo.userImage}
              sx={{
                height: "30px",
                width: "30px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Link>
      </Box>
      <Paper
        sx={{
          position: "fixed",
          left: isMobile ? "15%" : isFHD ? "13%" : "12%",
          right: 0,
          top: 0,
          background: "linear-gradient(to top, #111 50%, #20105E)",
          overflowY: "auto",
          height: "100%",
        }}
      >
        <SongBody />
      </Paper>
    </ThemeProvider>
  );
}

export default Dashboard;
