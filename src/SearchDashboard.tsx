import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  HomeOutlined,
  Notifications,
  SearchOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import MusicAppBar from "./MusicAppBar";
import { useState } from "react";
import { Library } from "./Library";

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
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "lightgrey" }}
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
                    <ListItemText
                      primary="Start"
                      sx={{ cursor: "pointer" }}
                      primaryTypographyProps={{
                        fontSize: "20px",
                        fontWeight: "medium",
                      }}
                    />
                  </ListItem>
                </Box>
              </Link>
              <Link style={{ color: "lightgrey" }} to={"/search"}>
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
              </Link>
            </Box>
            <Library />
          </List>
        </Paper>
      </Drawer>
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
          <TextField
            type="search"
            label="Was möchtest du hören?"
            InputLabelProps={{
              style: { color: "grey", marginLeft: "30px", fontSize: "16px" },
              shrink: false,
            }}
            InputProps={{
              sx: {
                borderRadius: "30px",
                backgroundColor: "#232324",
                width: "400px",
              },
              startAdornment: (
                <SearchOutlined
                  fontSize="medium"
                  sx={{
                    color: "lightgrey",
                    marginRight: "10px",
                  }}
                />
              ),
            }}
          />
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
          <Avatar
            src="/images/ANXIETY.jpg"
            sx={{
              height: "30px",
              width: "30px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default SearchDashBoard;
