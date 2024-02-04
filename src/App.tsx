import "./App.css";

import Playbar from "./Playbar";
import SongInfo from "./SongInfo";
import backgroundImage from "/images/theneighbourhood.jpg";

function App() {
  const containerStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "fixed",
    left: 0,
    top: 0,
  };

  return (
    <>
      <div style={containerStyle} />
      <SongInfo />
      <Playbar />
    </>
  );
}

export default App;
