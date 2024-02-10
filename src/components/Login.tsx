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
    const clientId = "41bf781b5b38499686cd3c5ebaa1570c";
    const redirectUri = "https://main--aesthetic-eclair-938ae7.netlify.app";
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
        sx={{ width: "100%", height: "100px", backgroundColor: "#121212" }}
      />
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
          <Typography variant="h3" sx={{ color: "#fff" }}>
            Log in to Spotify
          </Typography>
          <Divider
            sx={{
              width: "80%",
              backgroundColor: "#555555",
            }}
          />
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

      <AppBar
        sx={{
          width: "100%",
          height: "100px",
          position: "fixed",
          top: "95%",
          backgroundColor: "#121212",
        }}
      />
    </ThemeProvider>
  );
}

export default Login;
