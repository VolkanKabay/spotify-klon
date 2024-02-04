import { Box, Typography } from "@mui/material";

export function Search() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#121212",
      }}
    >
      <Typography variant="h3" sx={{ color: "#fff", marginBottom: "20px" }}>
        Search
      </Typography>
    </Box>
  );
}
