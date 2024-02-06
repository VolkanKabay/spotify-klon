import { useState, useEffect } from "react";
import "./App.css";
import Playbar from "./components/Playbar";
import SweaterWeather from "./components/SweaterWeather";
import MeetMeAtOurSpot from "./components/MeetMeAtOurSpot";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SearchDashBoard from "./components/SearchDashboard";
import Login from "./components/Login";
import Profile from "./components/Profile";

import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [{ token }, dispatch] = useStateProvider();

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchDashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/songs"
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
