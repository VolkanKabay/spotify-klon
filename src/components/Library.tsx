import { Box, Paper, ListItem, ListItemText, Chip } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Playlists from "./Playlists";
import { Link } from "react-router-dom";

export function Library() {
  return (
    <Box
      sx={{
        width: "310px",
        margin: "20px auto 0px auto",
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#171717",
          borderRadius: "10px",
          height: "100%",
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
        <Link
          to="/playlist"
          style={{ textDecoration: "none", color: "lightgrey" }}
        >
          <Playlists />
        </Link>
      </Paper>
    </Box>
  );
}
