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
              external_urls,
            },
          }: {
            track: {
              album: { images: Array<{ url: string }> };
              id: string;
              name: string;
              external_urls: { spotify: string };
            };
          }) => {
            return {
              id,
              image: images[0].url,
              name,
              external_urls,
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
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "1rem",
        justifyContent: "center",
        maxWidth: isFHD ? "1800px" : "1200px",
        paddingBottom: "8rem",
      }}
    >
      {savedTracks.map(
        (track: {
          id: Key | null | undefined;
          image: string | undefined;
          name: string | undefined;
          external_urls: { spotify: string | undefined };
        }) => (
          <Box
            key={track.id}
            sx={{
              width: "14vw",
              marginBottom: "2rem",
            }}
          >
            <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#282828",
                  borderRadius: "8px",
                  cursor: "pointer",
                  flexDirection: "row",
                }}
              >
                <img
                  src={track.image}
                  alt="album"
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    marginRight: "1rem",
                    borderTopLeftRadius: "8px",
                    borderBottomLeftRadius: "8px",
                  }}
                />
                <Typography
                  fontSize={18}
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
            </a>
          </Box>
        )
      )}
    </Box>
  );
}
