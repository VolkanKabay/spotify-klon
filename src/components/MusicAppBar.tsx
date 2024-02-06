import { useState, useEffect, useRef, ChangeEvent } from "react";
import { Box, Container, Slider, AppBar } from "@mui/material";
import {
  Pause,
  PlayArrow,
  Shuffle,
  SkipPrevious,
  SkipNext,
  Replay,
  CloseFullscreen,
  VolumeOffOutlined,
  VolumeDownOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

import sweaterWeatherSong from "/images/sweater-weather.mp3";
import meetMeAtOurSpotSong from "/images/meetmeatourspot.mp3";
import useMediaQuery from "@mui/material/useMediaQuery";
import CurrentTrack from "./CurrentTrack";
const songs = [sweaterWeatherSong, meetMeAtOurSpotSong];

function MusicAppBar({
  onNextSong,
  onPrevSong,
}: Readonly<{
  onNextSong: () => void;
  onPrevSong: () => void;
}>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isReplayActive, setIsReplayActive] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audioRef = useRef(new Audio(songs[currentSongIndex]));
  const isMobile = useMediaQuery("(max-width:600px)");
  const handleVolumeSliderChange = (
    _event: Event,
    value: number | number[]
  ) => {
    handleVolumeChange({} as ChangeEvent<HTMLInputElement>, value);
  };

  const handlePausePlayToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSkipNext = () => {
    onNextSong();
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextSongIndex);
    audioRef.current.src = songs[nextSongIndex];
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePrevSong = () => {
    onPrevSong();
    const prevSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevSongIndex);
    audioRef.current.src = songs[prevSongIndex];
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handleShuffleClick = () => {
    setIsShuffleActive((prevIsShuffleActive) => !prevIsShuffleActive);
  };

  const handleReplayClick = () => {
    setIsReplayActive((prevIsReplayActive) => !prevIsReplayActive);
  };

  const handleVolumeChange = (
    _event: ChangeEvent<HTMLInputElement>,
    newValue: number | number[]
  ) => {
    const newVolume = Array.isArray(newValue)
      ? newValue[0] / 100
      : newValue / 100;
    audioRef.current.volume = newVolume;
  };

  const muteSong = () => {
    audioRef.current.volume = 0;
  };

  useEffect(() => {
    audioRef.current.volume = 0.15;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        handlePausePlayToggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const handleSongEnd = () => {
      if (isReplayActive) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else {
        handleSkipNext();
      }
    };

    audioRef.current.addEventListener("ended", handleSongEnd);

    const currentAudioRef = audioRef.current;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      currentAudioRef.removeEventListener("ended", handleSongEnd);
    };
  }, [handleSkipNext, isReplayActive, handlePausePlayToggle]);

  return (
    <AppBar
      sx={{
        height: "11vh",
        top: "auto",
        bottom: 0,
        position: "fixed",
        background: "#000000",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
            position: "fixed",
            left: "0%",
            bottom: "1.5%",
          }}
        >
          <CurrentTrack />
        </Box>

        <Container
          sx={{
            position: "fixed",
            bottom: isMobile ? "4%" : "2%",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? "10px" : "20px",
          }}
        >
          <Shuffle
            sx={{
              height: "auto",
              width: "30px",
              fill: isShuffleActive ? "lightgreen" : "grey",
              ":hover": {
                fill: "white",
              },
            }}
            onClick={handleShuffleClick}
          />
          <SkipPrevious
            onClick={handlePrevSong}
            sx={{
              height: "auto",
              width: "30px",
              fill: "grey",
              ":hover": {
                fill: "white",
              },
            }}
          />
          <Box
            sx={{
              borderRadius: "50%",
              border: "1px solid white",
              height: "auto",
              width: "45px",
              display: "flex",
              backgroundColor: "white",
              transition: "transform 0.3s",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={handlePausePlayToggle}
          >
            {isPlaying ? (
              <Pause
                sx={{
                  height: "auto",
                  fontSize: "45px",
                  fill: "#000",
                }}
              />
            ) : (
              <PlayArrow
                sx={{
                  height: "auto",
                  width: "45px",
                  fill: "#000",
                }}
              />
            )}
          </Box>
          <SkipNext
            sx={{
              height: "auto",
              width: "30px",
              fill: "grey",
              ":hover": {
                fill: "white",
              },
            }}
            onClick={handleSkipNext}
          />
          <Replay
            sx={{
              height: "auto",
              width: "30px",
              fill: isReplayActive ? "lightgreen" : "grey",
              ":hover": {
                fill: "white",
              },
            }}
            onClick={handleReplayClick}
          />
        </Container>
        {!isMobile && (
          <>
            {audioRef.current.volume === 0 ? (
              <VolumeOffOutlined
                fontSize="large"
                sx={{
                  color: "white",
                  marginRight: "10px",
                  right: "12%",
                  bottom: "2%",
                  position: "fixed",
                }}
              />
            ) : (
              <VolumeDownOutlined
                fontSize="large"
                onClick={muteSong}
                sx={{
                  color: "white",
                  marginRight: "10px",
                  right: "12%",
                  bottom: "2%",
                  position: "fixed",
                }}
              />
            )}
            <Slider
              value={audioRef.current.volume * 100}
              onChange={handleVolumeSliderChange}
              sx={{
                color: "white",
                width: "100px",
                marginRight: "10px",
                right: "6%",
                bottom: "2.1%",
                position: "fixed",
              }}
            />
          </>
        )}
        <Link to="/songs">
          <CloseFullscreen
            sx={{
              height: "auto",
              width: "30px",
              right: "4%",
              bottom: "2%",
              position: "fixed",
              fill: "grey",
              ":hover": {
                fill: "white",
              },
            }}
          />
        </Link>
      </Container>
    </AppBar>
  );
}

export default MusicAppBar;
