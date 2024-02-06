import { Box, Paper, ListItem, ListItemText, Chip } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Playlists from "./Playlists";

export function Library() {
  return (
    <Box
      sx={{
        background: "#171717",
        width: "310px",
        margin: "20px auto 0px auto",
        height: "100%",
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#171717",
          borderRadius: "10px",
          height: "cover",
        }}
      >
        <Box
          sx={{
            margin: "5px",
          }}
        >
          <ListItem>
            <Menu fontSize="large" sx={{ cursor: "pointer" }} />
            <ListItemText
              sx={{ cursor: "pointer" }}
              primary="Bibliothek"
              primaryTypographyProps={{
                fontSize: "20px",
                fontWeight: "medium",
                marginLeft: "15px",
              }}
            />
          </ListItem>
        </Box>
        <Chip label="Playlists" />
        <Chip label="Künstler" />
        <Chip label="Alben" />
        <Playlists />
      </Paper>
    </Box>
  );
}
