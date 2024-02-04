import { Favorite } from "@mui/icons-material";
import { AppBar, Box, Typography } from "@mui/material";
import Image from "mui-image";

export function MusicAppBar() {
  return (
    <AppBar
      sx={{
        height: "100px",
        top: "auto",
        bottom: 0,
        position: "fixed",
        background: "#111111",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "start",
          flexDirection: "column",
          position: "fixed",
          left: "5.5%",
          bottom: "3%",
        }}
      >
        <Image
          src="/images/sweater-weather-cover.jpg"
          alt="Sweater Weather by the Neighbourhood"
          style={{
            height: "auto",
            width: "60px",
            position: "fixed",
            left: "1.5%",
            bottom: "2.5%",
            transform: "none",
          }}
        />
        <Typography>Sweater Weather</Typography>
        <Typography color={"darkgray"} fontSize={"13px"}>
          The Neighbourhood
        </Typography>
      </Box>
      <Favorite
        fontSize="small"
        sx={{ position: "fixed", bottom: "4%", left: "13%" }}
      />
    </AppBar>
  );
}
