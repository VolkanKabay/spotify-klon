import {
  AppBar,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Image from "mui-image";
const theme = createTheme({
  palette: {
    primary: {
      main: "#111",
    },
    background: {
      default: "#111210",
    },
  },
});
function Login() {
  const handleClick = () => {
    const clientId = ""; // Change this to your client ID
    const redirectUri = ""; // Change this to your redirect URI
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scopes = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
      "user-library-read",
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{ backgroundColor: "black", top: "0%", padding: "3rem" }}
      >
        <Box
          sx={{ display: "flex", position: "absolute", left: "3%", top: "25%" }}
        >
          <Image
            src="../images/spoti-icon.png"
            alt="Spotify Icon"
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
            }}
          />
          <Typography
            variant="h5"
            fontSize={20}
            sx={{ color: "#fff", fontWeight: "bold", paddingTop: "5px" }}
          >
            Spotify™
          </Typography>
        </Box>
      </AppBar>
      <Paper
        elevation={3}
        sx={{
          width: "700px",
          height: "600px",
          borderRadius: "20px",
          backgroundColor: "#121212",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <Typography variant="h4" fontWeight={600} sx={{ color: "#fff" }}>
            Bei Spotify anmelden
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "white",
              fontWeight: "bolder",
              backgroundColor: "#1DB954",

              borderRadius: "50px",
              ":hover": { backgroundColor: "#fff" },
            }}
          >
            Weiter mit Google
          </Button>
          <Button
            variant="contained"
            sx={{
              color: "white",
              fontWeight: "bolder",
              backgroundColor: "#1DB954",

              borderRadius: "50px",
              ":hover": { backgroundColor: "#fff" },
            }}
          >
            Weiter mit Apple
          </Button>

          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <TextField
              label="Username"
              variant="filled"
              sx={{ backgroundColor: "#fff" }}
            />
            <TextField
              label="Password"
              variant="filled"
              type="password"
              sx={{ backgroundColor: "#fff" }}
            />

            <Button
              onClick={handleClick}
              variant="contained"
              sx={{
                color: "#000",
                fontWeight: "bolder",
                backgroundColor: "#1DB954",
                borderRadius: "50px",
                ":hover": {
                  backgroundColor: "#fff",
                },
              }}
            >
              Login with Spotify
            </Button>
          </Box>
          <Divider
            sx={{
              width: "80%",
              backgroundColor: "#555555",
            }}
          />
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default Login;
