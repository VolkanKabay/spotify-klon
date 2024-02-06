import { ArrowLeft, ArrowRight, Notifications } from "@mui/icons-material";
import { Tooltip, Avatar } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useStateProvider } from "../utils/StateProvider";
import useUserInfoEffect from "./getUserInfo";

export function NavigationBar() {
  const [{ token, userInfo }] = useStateProvider();
  useUserInfoEffect(token);
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: "20%",
          width: "100%",
          zIndex: 1,
          display: "flex",
          flexDirection: "row",
          padding: "12px",
        }}
      >
        <ArrowLeft fontSize="large" sx={{ cursor: "pointer" }} />
        <ArrowRight fontSize="large" sx={{ cursor: "pointer" }} />
      </Box>
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
        <Link
          to="/notifications"
          style={{ textDecoration: "none", color: "lightgrey" }}
        >
          <Notifications fontSize="medium" sx={{ cursor: "pointer" }} />
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "lightgrey" }}>
          <Tooltip title={userInfo?.userName} placement="bottom">
            <Avatar
              src={userInfo.userImage}
              sx={{
                height: "30px",
                width: "30px",
                cursor: "pointer",
              }}
            />
          </Tooltip>
        </Link>
      </Box>
    </>
  );
}
