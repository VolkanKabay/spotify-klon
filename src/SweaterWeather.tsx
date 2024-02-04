import { Box, Container, Typography } from "@mui/material";
import { Image } from "mui-image";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import coverImage from "/images/sweater-weather-cover.jpg";
import backgroundImage from "/images/theneighbourhood.jpg";
import { useEffect, useState } from "react";

function SweaterWeather() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  const containerStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "100%",
    position: "fixed",
    left: 0,
    top: 0,
    opacity: opacity,
    transition: "opacity 1s ease-in-out",
  };

  return (
    <>
      <div style={containerStyle} />
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          position: "fixed",
          top: "5%",
          left: "5%",
        }}
      >
        <FontAwesomeIcon icon={faSpotify} size="4x" color="gray" />
        <Typography
          fontSize={16}
          letterSpacing={3}
          fontWeight={600}
          marginTop={2.5}
          marginLeft={3}
          color={"gray"}
        >
          PLAYING FROM TRACK
        </Typography>

        <Box
          sx={{
            textAlign: "start",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            position: "fixed",
            left: "17%",
            bottom: "30%",
          }}
        >
          <Typography fontSize={50} fontWeight={700}>
            Sweater Weather
          </Typography>
          <Typography fontSize={24} fontWeight={600} color={"darkgray"}>
            The Neighbourhood
          </Typography>
        </Box>
        <Image
          duration={0}
          src={coverImage}
          alt="Sweater Weather by the Neighbourhood"
          style={{
            height: "auto",
            width: "160px",
            position: "fixed",
            left: "6%",
            bottom: "30%",
          }}
        />
      </Container>
    </>
  );
}
export default SweaterWeather;
