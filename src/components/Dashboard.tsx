import { useEffect, useState, Key } from "react";
import {
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { Drawer } from "./Drawer";
import { NavigationBar } from "./NavigationBar";
import { Box } from "@mui/system";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

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
  const isFHD = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");
  const isMobile = useMediaQuery("(max-width: 1919px)");
  const [{ savedTracks, token }, dispatch] = useStateProvider();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const getSavedTracks = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/tracks/?limit=8",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const savedTracks = items.map(
          ({
            track: {
              album: { images },
              id,
              name,
            },
          }: {
            track: {
              album: { images: Array<{ url: string }> };
              id: string;
              name: string;
            };
          }) => {
            return {
              id,
              image: images[0].url,
              name,
            };
          }
        );

        dispatch({ type: reducerCases.SET_SAVED_TRACKS, savedTracks });
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };
    getSavedTracks();

    // Determine the appropriate greeting based on the current time
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Guten Morgen");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Guten Tag");
    } else {
      setGreeting("Guten Abend");
    }
  }, [token, dispatch]);

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
      >
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            display: "flex",
            marginLeft: isFHD ? "5.5rem" : "7.3rem",
            marginTop: "5rem",
          }}
        >
          {greeting}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)", // 4 tracks per row
            gap: "1rem",
            padding: "1rem",
            margin: "auto",
            maxWidth: isFHD ? "1800px" : "1200px", // Adjust max width as needed
          }}
        >
          {savedTracks.map(
            (track: {
              id: Key | null | undefined;
              image: string | undefined;
              name: string | undefined;
            }) => (
              <Box
                key={track.id}
                sx={{
                  width: "100%",
                  marginBottom: "2rem",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    backgroundColor: "#282828",
                    borderRadius: "8px", // Rounded corners for the box
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={track.image}
                    alt="album"
                    style={{
                      width: "90px", // Reduced image width
                      height: "90px", // Reduced image height
                      objectFit: "cover",
                      marginRight: "1rem", // Increased margin between image and text
                    }}
                  />
                  <Typography
                    fontSize={18} // Reduced font size
                    fontWeight={700}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      textAlign: "start",
                    }}
                  >
                    {track.name}
                  </Typography>
                </Box>
              </Box>
            )
          )}
        </Box>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            display: "flex",
            marginLeft: isFHD ? "5.5rem" : "7.3rem",
          }}
        >
          Die größten Hits
        </Typography>
      </Paper>
    </ThemeProvider>
  );
}

export default Dashboard;
