import React, { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
import {
  Box,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export function TopSongs() {
  const [{ topTracks, token }, dispatch] = useStateProvider();
  const isFHD = useMediaQuery("(min-width: 1920px) and (max-width: 2559px)");
  const [selectValue, setSelectValue] = useState("8-short_term"); // Combined value of length and timeRange
  useEffect(() => {
    const [length, timeRange] = selectValue.split("-");

    const getTopTracks = async () => {
      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/me/top/tracks?limit=${length}&time_range=${timeRange}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const topTracks = items.map(
          ({
            album: { images },
            id,
            name,
            external_urls,
          }: {
            album: { images: Array<{ url: string }> };
            id: string;
            name: string;
            external_urls: { spotify: string };
          }) => {
            return {
              id,
              image: images[0].url,
              name,
              external_urls,
            };
          }
        );

        dispatch({ type: reducerCases.SET_TOP_TRACKS, topTracks });
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };
    getTopTracks();
  }, [token, dispatch, selectValue]);

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectValue(event.target.value);
  };

  return (
    <>
      <Box>
        <Select
          value={selectValue}
          onChange={handleSelectChange}
          sx={{
            marginBottom: "1rem",
            color: "white",
            backgroundColor: "#232324",
          }}
        >
          <MenuItem value="8-short_term">Show 8 Songs (Last 4 Weeks)</MenuItem>

          <MenuItem value="40-short_term">
            Show 40 Songs (Last 4 Weeks)
          </MenuItem>
          <MenuItem value="8-medium_term">
            Show 8 Songs (Last 6 Months)
          </MenuItem>

          <MenuItem value="40-medium_term">
            Show 40 Songs (Last 6 Months)
          </MenuItem>
          <MenuItem value="8-long_term">Show 8 Songs (All Time)</MenuItem>
          <MenuItem value="40-long_term">Show 40 Songs (All Time)</MenuItem>
        </Select>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1rem",
          paddingBottom: "8rem",
          margin: "auto",
          maxWidth: isFHD ? "1800px" : "1350px",
        }}
      >
        {topTracks.map((track: any) => (
          <Box
            key={track.id}
            sx={{
              width: "100%",
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
                }}
              >
                <img
                  src={track.image}
                  alt={track.name}
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
        ))}
      </Box>
    </>
  );
}
