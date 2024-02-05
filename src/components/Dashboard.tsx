import {
  Avatar,
  Box,
  Paper,
  ThemeProvider,
  Tooltip,
  createTheme,
} from "@mui/material";
import { ArrowLeft, ArrowRight, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import useUserInfoEffect from "./getUserInfo";
import { useStateProvider } from "../utils/StateProvider";
import { Drawer } from "./Drawer";
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
  const [{ token, userInfo }] = useStateProvider();
  useUserInfoEffect(token);

  return (
    <ThemeProvider theme={theme}>
      <Drawer />
      <Paper
        sx={{
          position: "fixed",
          top: "0%",
          left: "0%",
          width: "100%",
          height: "100vh",
          backgroundColor: "#111",
        }}
      />
      <Paper
        sx={{
          position: "fixed",
          top: "1.25%",
          left: "15%",
          width: "85%",
          height: "100vh",
          backgroundColor: "#171717",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            top: "2%",
            left: "18.5%",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "5px",
              padding: "12px",
            }}
          >
            <ArrowLeft
              fontSize="large"
              sx={{
                cursor: "pointer",
                background: "#111",
                borderRadius: "50%",
              }}
            />
            <ArrowRight
              fontSize="large"
              sx={{
                cursor: "pointer",
                background: "#111",
                borderRadius: "50%",
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "15px",
            position: "fixed",
            right: "3%",
            top: "3.3%",
          }}
        >
          <Link
            to="/notifications"
            style={{ textDecoration: "none", color: "lightgrey" }}
          >
            <Notifications
              fontSize="medium"
              sx={{
                cursor: "pointer",
                background: "#111",
                borderRadius: "50%",
                padding: "4px",
                top: "3.2%",
                right: "5.5%",
                position: "fixed",
              }}
            />
          </Link>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "lightgrey" }}
          >
            <Tooltip title={userInfo?.userName} placement="bottom">
              <Avatar
                src="/images/ANXIETY.jpg"
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
    </ThemeProvider>
  );
}

export default Dashboard;
