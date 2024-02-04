import { useState, useEffect, useRef } from "react";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import {
  CheckCircle,
  Pause,
  PlayArrow,
  Shuffle,
  SkipPrevious,
  SkipNext,
  Replay,
  CloseFullscreen,
} from "@mui/icons-material";

import sweaterWeatherSong from "../public/images/sweater-weather.webm";

function Playbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [isShuffleActive, setIsShuffleActive] = useState(false);
  const [isReplayActive, setIsReplayActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDurationAvailable, setIsDurationAvailable] = useState(false);

  const audioRef = useRef(new Audio(sweaterWeatherSong));

  const handlePausePlayToggle = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
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

  useEffect(() => {
    audioRef.current.volume = 0.2;

    const handleTimeUpdate = () => {
      setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audioRef.current.duration);
      setIsDurationAvailable(true);
    };

    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

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

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeout);
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
    };
  }, []);

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
                  }}
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
