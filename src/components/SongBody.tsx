/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import { Box, Container, Divider, Typography, Skeleton } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";

export function SongBody() {
  const [{ token, selectedPlaylistId, selectedPlaylist, userInfo }, dispatch] =
    useStateProvider();
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const getInitialPlaylist = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        );

        const selectedPlaylistData = {
          name: response.data.name,
          id: response.data.id,
          description: response.data.description.startsWith("<a")
            ? ""
            : response.data.description,
          type: response.data.type,
          owner: response.data.owner,
          image: response.data.images[0].url,
          external_urls: response.data.external_urls.spotify,
          tracks: response.data.tracks.items.map(
            ({ track }: { track: any }) => ({
              id: track.id,
              name: track.name,
              artists: track.artists.map(
                (artist: { name: any }) => artist.name
              ),
              album: track.album.name,
              context_uri: track.album.uri,
              track_number: track.track_number,
              image: track.album.images[2].url,
            })
          ),
        };
        dispatch({
          type: reducerCases.SET_PLAYLIST,
          selectedPlaylist: selectedPlaylistData,
        });
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false); // Set loading to false when done fetching
      }
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  if (loading || !selectedPlaylist) {
    return (
      <Container sx={{ marginLeft: "3.5rem", width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          <Skeleton
            variant="rectangular"
            width={200}
            height={200}
            sx={{ marginTop: "5%" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              justifyContent: "start",
              alignItems: "start",
              marginLeft: "20px",
              marginTop: "5rem",
            }}
          >
            <Skeleton width={200} height={20} />
            <Skeleton width={300} height={40} />
            <Skeleton width={200} height={40} />
            <Skeleton width={200} height={20} />
          </Box>
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          {[...Array(10)].map((_, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <Skeleton width={50} height={50} />
              <Box sx={{ marginLeft: 2 }}>
                <Skeleton width={200} height={20} />
                <Skeleton width={100} height={20} />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ marginLeft: "3.5rem", width: "100%" }}>
      <Box sx={{ display: "flex" }}>
        <a
          href={selectedPlaylist?.external_urls}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={selectedPlaylist?.image}
            alt="playlist"
            style={{
              height: "150px",
              width: "150px",
              marginTop: "5rem",
              objectFit: "cover",
            }}
          />
        </a>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            justifyContent: "start",
            alignItems: "start",
            marginLeft: "20px",
            marginTop: "5rem",
          }}
        >
          <Typography>{selectedPlaylist?.type}</Typography>
          <Typography variant="h2" fontWeight={700}>
            {selectedPlaylist?.name}
          </Typography>
          <Typography fontSize={12}>{selectedPlaylist?.description}</Typography>
          <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <img
              style={{ borderRadius: "100%", height: "20px", width: "20px" }}
              src={userInfo.userImage}
              alt="user"
            />
            <Typography fontSize={12} fontWeight={800}>
              {selectedPlaylist?.owner.display_name}
            </Typography>
            <Typography fontSize={12} fontWeight={800}>
              ·
            </Typography>
            <Typography fontSize={12} fontWeight={800}>
              {selectedPlaylist?.tracks.length} Songs
            </Typography>
          </Box>
        </Box>
      </Box>
      <button
        style={{
          borderRadius: "50%",
          height: "auto",
          width: "auto",
          background: "#1ED760",
          justifyContent: "center",
          display: "flex",
          margin: "3rem 0 0 0",
          padding: "1rem",
        }}
      >
        <PlayArrow sx={{ fill: "black" }} />
      </button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: "#A7A7A7",
          marginTop: "1rem",
        }}
      >
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            gap: "12px",
          }}
        >
          <Typography fontSize={16}>#</Typography>
          <Typography fontSize={16}>Titel</Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: "40%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography fontSize={16}>Album</Typography>
        </Box>
      </Box>

      <Divider
        sx={{
          background: "#transparent",
          marginTop: "0.3rem",
          width: "78vw",
          borderBottom: "1px solid #282828",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "2rem",
          alignItems: "start",
        }}
      >
        {selectedPlaylist?.tracks.map((track: any, index: number) => (
          <Box
            key={track.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              padding: "5px",
              alignItems: "center",
              ":hover": {
                backgroundColor: "#282828",
                cursor: "pointer",
                width: "100vw",
              },
            }}
          >
            <Typography
              sx={{ width: "10px", textAlign: "right", marginRight: "20px" }}
            >
              {index + 1}.
            </Typography>
            <img
              src={track.image}
              alt="album"
              style={{
                height: "50px",
                width: "50px",
                objectFit: "cover",
                marginRight: "10px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Typography fontWeight={700} sx={{ marginRight: "5px" }}>
                {track.name}
              </Typography>
              <Typography sx={{ marginRight: "5px" }}>
                {track.artists.join(", ")}
              </Typography>
            </Box>
            <Typography
              sx={{
                display: "flex",
                flexDirection: "row",
                position: "absolute",
                left: "40%",
              }}
            >
              {track.album}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
