import axios from "axios";
import { Key, useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

export function DashboardItems() {
  const [{ savedTracks, token }, dispatch] = useStateProvider();
  const isFHD = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");

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
  }, [token, dispatch]);

  return (
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
  );
}
