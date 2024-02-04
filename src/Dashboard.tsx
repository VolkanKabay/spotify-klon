import {
  Box,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { HomeOutlined, Menu, SearchOutlined } from "@mui/icons-material";
import { NewPlaylist } from "./NewPlaylist";
import { NewFavSongs } from "./NewFavSongs";
import { Link } from "react-router-dom";
import MusicAppBar from "./MusicAppBar";
import { useState } from "react";

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
  const [, setCurrentSongIndex] = useState(0);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };
  return (
    <ThemeProvider theme={theme}>
      <Drawer variant="permanent" open={true}>
        <MusicAppBar onNextSong={handleNextSong} onPrevSong={handlePrevSong} />
        <Paper
          sx={{
            width: "330px",
            height: "100vh",
          }}
        >
          <List>
            <Box
              sx={{
                background: "#171717",
                borderRadius: "10px",
                width: "310px",
                margin: "auto",
                height: "120px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "3px 0px 0px 20px",
                }}
              >
                <HomeOutlined fontSize="large" sx={{ cursor: "pointer" }} />
                <ListItem>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "lightgrey" }}
                  >
                    <ListItemText
                      primary="Start"
                      sx={{ cursor: "pointer" }}
                      primaryTypographyProps={{
                        fontSize: "20px",
                        fontWeight: "medium",
                      }}
                    />
                  </Link>
                </ListItem>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px 10px 0px 20px",
                }}
              >
                <SearchOutlined fontSize="large" sx={{ cursor: "pointer" }} />
                <ListItem>
                  <ListItemText
                    sx={{ cursor: "pointer" }}
                    primary="Suchen"
                    primaryTypographyProps={{
                      fontSize: "20px",
                      fontWeight: "medium",
                    }}
                  />
                </ListItem>
              </Box>
            </Box>
            <Box
              sx={{
                background: "#171717",
                width: "310px",
                margin: "20px auto 0px auto",
                height: "120px",
              }}
            >
              <Paper
                sx={{
                  backgroundColor: "#171717",
                  borderRadius: "10px",
                  height: "670px",
                }}
              >
                <Box
                  sx={{
                    margin: "5px",
                  }}
                >
                  <ListItem>
                    <Menu fontSize="large" sx={{ cursor: "pointer" }} />
                    <ListItemText
                      sx={{ cursor: "pointer" }}
                      primary="Bibliothek"
                      primaryTypographyProps={{
                        fontSize: "20px",
                        fontWeight: "medium",
                        marginLeft: "15px",
                      }}
                    />
                  </ListItem>
                </Box>
                <Chip label="Playlists" />
                <Chip label="Künstler" />
                <Chip label="Alben" />
                <NewFavSongs />
                <NewPlaylist />
                <NewPlaylist />
                <NewPlaylist />
                <NewPlaylist />
              </Paper>
            </Box>
          </List>
        </Paper>
      </Drawer>
    </ThemeProvider>
  );
}

export default Dashboard;
