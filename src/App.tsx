import { useState } from "react";
import "./App.css";
import Playbar from "./Playbar";
import SweaterWeather from "./SweaterWeather";
import MeetMeAtOurSpot from "./MeetMeAtOurSpot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import SearchDashBoard from "./SearchDashboard";
function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchDashBoard />} />
        <Route
          path="/"
          element={
            <div style={{ userSelect: "none" }}>
              {currentSongIndex === 0 ? (
                <SweaterWeather />
              ) : (
                <MeetMeAtOurSpot />
              )}
              <Playbar
                onNextSong={handleNextSong}
                onPrevSong={handlePrevSong}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
