import { Menu, MenuItem, Tooltip, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useState, useRef } from "react"; // Import useState and useRef
import { useStateProvider } from "../utils/StateProvider";
import useUserInfoEffect from "./getUserInfo";
import { Notifications } from "@mui/icons-material";
export function NavigationBar() {
  const [{ token, userInfo }] = useStateProvider();
  useUserInfoEffect(token);

  const [menuAnchorEl, setMenuAnchorEl] = useState<
    (EventTarget & Element) | null
  >(null);

  const handleMenuOpen = (event: React.MouseEvent<EventTarget & Element>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const menuRef = useRef(null);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: "90%",
        gap: "10px",
        width: "100%",
        zIndex: 1,
        display: "flex",
        flexDirection: "row",
        padding: "12px",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", color: "lightgrey" }}>
        <Notifications fontSize="medium" sx={{ cursor: "pointer" }} />
      </Link>
      <Tooltip title={userInfo.userName} arrow>
        <Avatar
          onClick={handleMenuOpen}
          src={userInfo.userImage}
          sx={{
            height: "30px",
            width: "30px",
            cursor: "pointer",
          }}
        />
      </Tooltip>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        ref={menuRef}
      >
        <MenuItem onClick={handleMenuClose}>Konto</MenuItem>
        <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
        <MenuItem onClick={handleMenuClose}>Einstellungen</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
