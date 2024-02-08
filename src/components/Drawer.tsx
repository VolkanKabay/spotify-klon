import { HomeOutlined, SearchOutlined } from "@mui/icons-material";
import {
  Paper,
  List,
  Box,
  ListItem,
  ListItemText,
  Drawer as MuiDrawer,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Library } from "./Library";
import MusicAppBar from "./MusicAppBar";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export function Drawer() {
  const [, setCurrentSongIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detect if screen size is mobile

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  return (
    <MuiDrawer variant="permanent" open={true}>
      <MusicAppBar onNextSong={handleNextSong} onPrevSong={handlePrevSong} />
      <Paper
        sx={{
          width: isMobile ? "100%" : "10%", // Set width to 100% on mobile, 10% otherwise
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
    </MuiDrawer>
  );
}
