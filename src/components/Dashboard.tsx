import {
  Paper,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import { Drawer } from "./Drawer";
import { NavigationBar } from "./NavigationBar";

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

  return (
    <ThemeProvider theme={theme}>
      <Drawer />
      <NavigationBar />
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
      ></Paper>
    </ThemeProvider>
  );
}

export default Dashboard;
