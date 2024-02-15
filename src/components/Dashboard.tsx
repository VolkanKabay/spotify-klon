import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Drawer } from "./Drawer";
import { NavigationBar } from "./NavigationBar";

import { DashboardItems } from "./DashboardItems";
import { TopSongs } from "./TopSongs";
import { Box } from "@mui/system";

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
          "&:hover": {
            backgroundColor: "#282828",
          },
        },
      },
    },
  },
});

function Dashboard() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Guten Morgen");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Guten Tag");
    } else {
      setGreeting("Guten Abend");
    }
  }, []);
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
        }}
      >
        <Container className="lastSongs" maxWidth="xl">
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              marginTop: "5rem",
              marginBottom: "2rem",
              textAlign: "start",
            }}
          >
            {greeting}
          </Typography>

          <DashboardItems />
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{
              marginTop: "5rem",
              marginBottom: "2rem",
              textAlign: "start",
            }}
          >
            Deine Top Songs
          </Typography>
          <TopSongs />
        </Container>
      </Paper>
    </ThemeProvider>
  );
}

export default Dashboard;
