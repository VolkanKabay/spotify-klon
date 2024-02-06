/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const getCurrentTrack = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/player/currently-playing",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        );
        const { item } = response.data;

        if (item && item.name && item.artists && item.album) {
          const newCurrentlyPlaying = {
            name: item.name,
            artist: item.artists.map((artist: any) => artist.name),
            id: item.id,
            image: item.album.images[2].url,
            duration: item.duration_ms,
            progress: response.data.progress_ms,
          };

          const progressPercentage =
            (response.data.progress_ms / item.duration_ms) * 100;
          setProgressPercentage(progressPercentage);

          dispatch({
            type: reducerCases.SET_CURRENTLY_PLAYING,
            currentlyPlaying: newCurrentlyPlaying,
          });
        } else {
          console.error("Currently playing track data is incomplete:", item);
        }
      } catch (error) {
        console.error("Error fetching current track:", error);
      }
    };

    getCurrentTrack();

    const interval = setInterval(() => {
      getCurrentTrack();
    }, 1000);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  if (!currentlyPlaying) {
    return <div>Nothing is being played!</div>;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={currentlyPlaying.image}
        alt="album"
        style={{ height: "70px", width: "70px", objectFit: "cover" }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "1rem",
          alignItems: "start",
        }}
      >
        <Typography fontWeight={800} fontSize={18}>
          {currentlyPlaying.name}
        </Typography>
        <Typography fontSize={12}>
          {currentlyPlaying.artist.join(", ")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2">
            {formatTimestamps(currentlyPlaying.progress)}
          </Typography>
          <progress
            value={progressPercentage}
            max={100}
            style={{ width: "100px", margin: "0.3rem" }}
          />
          <Typography variant="body2">
            {formatTimestamps(currentlyPlaying.duration)}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

function formatTimestamps(milliseconds: number): string {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}
