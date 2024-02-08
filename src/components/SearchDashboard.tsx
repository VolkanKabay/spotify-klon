import {
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import { Drawer } from "./Drawer";

import { NavigationBar } from "./NavigationBar";
import { FeaturedPlaylists } from "./FeaturedPlaylists";

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

function SearchDashBoard() {
  const isFHD = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");

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
          left: 0,
          margin: 0,
          paddingLeft: "6.5%",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            display: "flex",
            marginLeft: isFHD ? "21.7rem" : "20.5rem",
            marginBottom: "2rem",
            marginTop: "5rem",
          }}
        >
          Playlists für dich
        </Typography>
        <FeaturedPlaylists />
      </Paper>
    </ThemeProvider>
  );
}

export default SearchDashBoard;
