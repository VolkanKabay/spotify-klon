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
import { useState, useEffect } from "react";

function Playbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMouseMoving, setIsMouseMoving] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const handlePausePlayToggle = () => {
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

  useEffect(() => {
    let timeout: number;

    setOpacity(0);
    timeout = setTimeout(() => {
      setOpacity(1);
    }, 500);

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
              0:32
            </Typography>
            <LinearProgress
              value={30}
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
              4:00
            </Typography>

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
                  fill: "grey",
                  ":hover": {
                    fill: "white",
                  },
                }}
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
                  fill: "grey",
                  ":hover": {
                    fill: "white",
                  },
                }}
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

export default Playbar;
