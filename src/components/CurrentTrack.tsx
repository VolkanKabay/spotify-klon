/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

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
        const newCurrentlyPlaying = {
          name: item.name,
          artist: item.artists.map((artist: any) => artist.name),
          id: item.id,
          image: item.album.images[2].url,
        };

        dispatch({
          type: reducerCases.SET_CURRENTLY_PLAYING,
          currentlyPlaying: newCurrentlyPlaying,
        });
      } catch (error) {
        console.error("Error fetching current track:", error);
      }
    };

    getCurrentTrack();
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
      </Box>
    </Container>
  );
}
