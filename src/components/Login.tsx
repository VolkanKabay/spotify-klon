import { Button } from "@mui/material";

function Login() {
  const handleClick = () => {
    const clientId = "41bf781b5b38499686cd3c5ebaa1570c";
    const redirectUri = "http://localhost:5173";
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
    ];

    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <>
      <Button onClick={handleClick} variant="contained" color="primary">
        Login with Spotify
      </Button>
    </>
  );
}

export default Login;
