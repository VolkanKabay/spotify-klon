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
      <Paper
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: "5%",
          width: "100%",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px",
          backgroundColor: "#111",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            marginLeft: "350px",
          }}
        >
          <ArrowLeft fontSize="large" sx={{ cursor: "pointer" }} />
          <ArrowRight fontSize="large" sx={{ cursor: "pointer" }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            alignItems: "center",
            marginRight: "20px",
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
      </Paper>
      <Paper
        sx={{
          position: "fixed",
          left: isMobile ? "15%" : isFHD ? "13%" : "12%",
          right: 0,
          top: 0,
          backgroundColor: "#171717",
          overflowY: "auto",
          height: "100%",
          paddingLeft: "5px",
        }}
      >
        <SongBody />
      </Paper>
    </ThemeProvider>
  );
}

export default Dashboard;
