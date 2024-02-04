import { Box, Typography } from "@mui/material";
import Image from "mui-image";

export function NewFavSongs() {
  return (
    <Box
      sx={{
        display: "flex",
        cursor: "pointer",
        flexDirection: "row",
        margin: "10px 0px 0px 10px",
        ":hover": {
          background: "#282828",
          borderRadius: "10px",
        },
      }}
    >
      <Image
        easing="0"
        style={{ width: "55px", padding: "10px" }}
        src={`/images/spotifylikedsongs.jpg`}
      />
      <Box
        sx={{
          paddingRight: "20px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
        }}
      >
        <Typography variant="h6">Lieblingssongs</Typography>
        <Typography
          variant="h6"
          sx={{
            width: "200px",
            fontSize: "15px",
            display: "flex",
          }}
        >
          Playlist · 940 Songs
        </Typography>
      </Box>
    </Box>
  );
}
