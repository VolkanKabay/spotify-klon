import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import {
  Box,
  Container,
  LinearProgress,
  Typography,
  Slider,
} from "@mui/material";
import {
  CheckCircle,
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

import sweaterWeatherSong from "../public/images/sweater-weather.mp3";
import meetMeAtOurSpotSong from "../public/images/meetmeatourspot.mp3";

const songs = [sweaterWeatherSong, meetMeAtOurSpotSong];

function Playbar({
  onNextSong,
  onPrevSong,
}: Readonly<{
  onNextSong: () => void;
  onPrevSong: () => void;
}>) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isReplayActive, setIsReplayActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDurationAvailable, setIsDurationAvailable] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const audioRef = useRef(new Audio(songs[currentSongIndex]));

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

  const handleSkipNext = () => {
    onNextSong();
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextSongIndex);
    audioRef.current.src = songs[nextSongIndex];
    audioRef.current.play();
  };
  const handlePrevSong = () => {
    onPrevSong();
    const prevSongIndex = (currentSongIndex - 1) % songs.length;
    setCurrentSongIndex(prevSongIndex);
    audioRef.current.src = songs[prevSongIndex];
    audioRef.current.play();
  };

  const handleSeek = (event: React.MouseEvent<object>) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;

    const newTime = (percentage / 100) * duration;
    audioRef.current.currentTime = newTime;

    setCurrentTime(newTime);
  };

  const handleFullscreenToggle = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen((prevIsFullscreen) => !prevIsFullscreen);
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

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
      setIsDurationAvailable(true);
    };

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

    let timeout: number;

    setOpacity(0);
    timeout = setTimeout(() => {
      setOpacity(1);
    }, 500);

    setIsMouseMoving(false);

    const handleMouseMove = () => {
      setIsMouseMoving(true);
      setOpacity(1);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setOpacity(0);
      }, 3000);
    };

    const handleMouseLeave = () => {
      setIsMouseMoving(false);
    };

    const currentAudioRef = audioRef.current;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeout);
      currentAudioRef.removeEventListener("timeupdate", handleTimeUpdate);
      currentAudioRef.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      currentAudioRef.removeEventListener("ended", handleSongEnd);
    };
  }, [isReplayActive]);

  return (
    <Container>
      <div
        style={{
          opacity: opacity,
          transition: "opacity 1s ease-in-out",
        }}
      >
        {isMouseMoving && (
          <>
            <Typography
              sx={{
                position: "fixed",
                left: "4%",
                bottom: "15.75%",
              }}
            >
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
                    position: "fixed",
                    bottom: "17%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "87%",
                    cursor: "pointer",
                  }}
                  onClick={handleSeek}
                />
                <Typography
                  sx={{ position: "fixed", right: "4%", bottom: "15.75%" }}
                >
                  {formatTime(duration)}
                </Typography>
              </>
            )}
            <CheckCircle
              sx={{
                height: "auto",
                width: "30px",
                position: "fixed",
                left: "4%",
                bottom: "7%",
                fill: "lightgreen",
              }}
            />
            <Container
              sx={{
                position: "fixed",
                bottom: "7%",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                justifyContent: "center",
                gap: "20px",
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
                  width: "65px",
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
                  <Pause sx={{ height: "auto", width: "65px", fill: "#000" }} />
                ) : (
                  <PlayArrow
                    sx={{ height: "auto", width: "65px", fill: "#000" }}
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
            {audioRef.current.volume === 0 ? (
              <VolumeOffOutlined
                fontSize="large"
                sx={{
                  color: "white",
                  marginRight: "10px",
                  right: "12%",
                  bottom: "6.75%",
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
                  bottom: "6.75%",
                  position: "fixed",
                }}
              />
            )}
            <Slider
              value={audioRef.current.volume * 100} // Set the initial value based on the current volume
              onChange={handleVolumeSliderChange}
              sx={{
                color: "white",
                width: "100px",
                marginRight: "10px",
                right: "6%",
                bottom: "7%",
                position: "fixed",
                pointerEvents: isMouseMoving ? "auto" : "none",
              }}
            />

            <CloseFullscreen
              sx={{
                height: "auto",
                width: "30px",
                right: "4%",
                bottom: "7%",
                position: "fixed",
                fill: isFullscreen ? "white" : "grey",
                ":hover": {
                  fill: "white",
                },
              }}
              onClick={handleFullscreenToggle}
            />
          </>
        )}
      </div>
    </Container>
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

export default Playbar;
