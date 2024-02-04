import { useState } from "react";
import "./App.css";
import Playbar from "./Playbar";
import SweaterWeather from "./SweaterWeather";
import MeetMeAtOurSpot from "./MeetMeAtOurSpot";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % 2);
  };
  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1) % 2);
  };

  return (
    <>
      {currentSongIndex === 0 ? <SweaterWeather /> : <MeetMeAtOurSpot />}
      <Playbar onNextSong={handleNextSong} onPrevSong={handlePrevSong} />
    </>
  );
}

export default App;
