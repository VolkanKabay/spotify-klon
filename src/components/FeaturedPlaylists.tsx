import { Box, Paper, Typography, useMediaQuery, Skeleton } from "@mui/material";
import { useStateProvider } from "../utils/StateProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export function FeaturedPlaylists() {
  const [{ featuredPlaylists, token }, dispatch] = useStateProvider();
  const isFHD = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeaturedPlaylists = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/browse/featured-playlists?limit=30",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        );
        const { items } = response.data.playlists;
        const featuredPlaylists = items.map(
          ({
            id,
            images,
            name,
            description,
            external_urls,
          }: {
            id: string;
            images: Array<{ url: string }>;
            name: string;
            description: string;
            external_urls: { spotify: string };
          }) => {
            return {
              id,
              image: images[0].url,
              name,
              description,
              external_urls,
            };
          }
        );

        dispatch({
          type: reducerCases.SET_FEATURED_PLAYLISTS,
          featuredPlaylists,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };
    getFeaturedPlaylists();
  }, [token, dispatch]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "1rem",
          paddingBottom: "10rem",
          margin: "auto",
          maxWidth: isFHD ? "1800px" : "1200px",
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <Box key={index}>
            <Paper
              sx={{
                padding: "1rem",
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                textAlign: "start",
                height: "18rem",
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="25rem" />
              <Skeleton variant="text" width="100%" height="15rem" />
            </Paper>
            <Paper
              sx={{
                marginTop: "2rem",
                padding: "1rem",
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                textAlign: "start",
                height: "18rem",
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="25rem" />
              <Skeleton variant="text" width="100%" height="15rem" />
            </Paper>
            <Paper
              sx={{
                marginTop: "2rem",

                padding: "1rem",
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                textAlign: "start",
                height: "18rem",
              }}
            >
              <Skeleton variant="rectangular" width="100%" height="25rem" />
              <Skeleton variant="text" width="100%" height="15rem" />
            </Paper>
          </Box>
        ))}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: isFHD
          ? "repeat(5, 1fr)"
          : "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "1rem",
        paddingBottom: "10rem",
        margin: "auto",
        maxWidth: isFHD ? "1800px" : "1200px",
      }}
    >
      {featuredPlaylists.map(
        (playlist: {
          id: string;
          image: string;
          name: string;
          description: string;
          external_urls: { spotify: string };
        }) => {
          return (
            <Box key={playlist.id}>
              <Paper
                sx={{
                  padding: "1rem",
                  borderRadius: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  textAlign: "start",
                  height: "27rem",
                }}
              >
                <a href={playlist.external_urls.spotify} target="_blank">
                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    style={{
                      borderRadius: "10px",
                      marginBottom: "1rem",
                    }}
                  />
                  <Typography
                    fontSize={20}
                    fontWeight={800}
                    style={{
                      color: "white",
                    }}
                  >
                    {playlist.name}
                  </Typography>
                  <Typography
                    fontSize={19}
                    fontWeight={400}
                    style={{ color: "grey" }}
                  >
                    {playlist.description}
                  </Typography>
                </a>
              </Paper>
            </Box>
          );
        }
      )}
    </Box>
  );
}
