import { Box, Typography } from "@mui/material";
import Image from "mui-image";

export function NewFavSongs() {
  const i = Math.floor(Math.random() * 5) + 1;

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
      <Image style={{ width: "55px" }} src={`/images/playlist${i}.jpg`} />
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
