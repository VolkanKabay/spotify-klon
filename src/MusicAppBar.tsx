import { AppBar } from "@mui/material";

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
    ></AppBar>
  );
}
