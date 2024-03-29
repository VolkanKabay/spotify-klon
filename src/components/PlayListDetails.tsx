import { Paper, ThemeProvider, createTheme } from "@mui/material";
import { Drawer } from "./Drawer";
import { SongBody } from "./SongBody";
import { NavigationBar } from "./NavigationBar";

export function PlaylistDetails() {
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
  return (
    <ThemeProvider theme={theme}>
      <Drawer />
      <NavigationBar />

      <Paper
        sx={{
          background: "linear-gradient(to top, #111 50%, #20105E)",
          overflowY: "auto",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 300,
          margin: 0,
        }}
      >
        <SongBody />
      </Paper>
    </ThemeProvider>
  );
}
