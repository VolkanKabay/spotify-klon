import { useState } from "react";
import "./App.css";
import Playbar from "./Playbar";
import SweaterWeather from "./SweaterWeather";
import MeetMeAtOurSpot from "./MeetMeAtOurSpot";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % 2); // Assuming 2 songs for illustration
  };

  return (
    <>
      {currentSongIndex === 0 ? <SweaterWeather /> : <MeetMeAtOurSpot />}
      <Playbar onNextSong={handleNextSong} />
    </>
  );
}

export default App;
