import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Box,
  Container,
  LinearProgress,
  Typography,
  Slider,
  AppBar,
} from "@mui/material";
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
  Favorite,
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDurationAvailable, setIsDurationAvailable] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const audioRef = useRef(new Audio(songs[currentSongIndex]));
  const isMobile = useMediaQuery("(max-width:600px)");
  const isWQHD = useMediaQuery("(min-width:2560px)");
  const isFHD = useMediaQuery("(min-width:1920px)");
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

  const handleSeek = (event: React.MouseEvent<object>) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;

    const newTime = (percentage / 100) * duration;
    audioRef.current.currentTime = newTime;

    setCurrentTime(newTime);
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
  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => !prevIsFavorite);
  };

  useEffect(() => {
    audioRef.current.volume = 0.15;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        handlePausePlayToggle();
      }
    };
    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
      setIsDurationAvailable(true);
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

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);
    audioRef.current.addEventListener("ended", handleSongEnd);

    const currentAudioRef = audioRef.current;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      currentAudioRef.removeEventListener("timeupdate", handleTimeUpdate);
      currentAudioRef.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      currentAudioRef.removeEventListener("ended", handleSongEnd);
    };
  }, [handleSkipNext, isReplayActive, handlePausePlayToggle]);

  return (
    <AppBar
      sx={{
        height: "100px",
        top: "auto",
        bottom: 0,
        position: "fixed",
        background: "#111111",
      }}
    >
      <Container>
        <Typography
          fontSize="small"
          sx={{
            position: "fixed",
            left: "30%",
            bottom: "2%",
          }}
        >
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

          <Favorite
            fontSize="small"
            sx={{
              position: "fixed",
              bottom: isMobile ? "6.5%" : "4%",
              left: isMobile ? "90%" : "14%",
              fill: isFavorite ? "lightgreen" : "white",
              ":hover": {
                fill: "lightgreen",
              },
            }}
            onClick={handleFavoriteClick}
          />
          {formatTime(currentTime)}
        </Typography>
        {isDurationAvailable && (
          <>
            <LinearProgress
              value={(currentTime / duration) * 100}
              variant="determinate"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "white",
                  ":hover": {
                    backgroundColor: "lightgreen",
                  },
                },
                width: isWQHD
                  ? "52%"
                  : isMobile
                  ? "52%"
                  : isFHD
                  ? "37%"
                  : "37%",
                bottom: "3%",
                position: "fixed",
                transform: isWQHD
                  ? "translateX(40%)"
                  : isMobile
                  ? "translateX(24%)"
                  : isFHD
                  ? "translateX(14%)"
                  : "translateX(35%)",
              }}
              onClick={handleSeek}
            />
            <Typography
              fontSize="small"
              sx={{
                position: "fixed",
                right: isMobile ? "13%" : "29%",
                bottom: "2%",
              }}
            >
              {formatTime(duration)}
            </Typography>
          </>
        )}
        <Container
          sx={{
            position: "fixed",
            bottom: isMobile ? "6%" : "4%",
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

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default MusicAppBar;
