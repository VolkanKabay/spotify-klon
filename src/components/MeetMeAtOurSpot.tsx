import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Image } from "mui-image";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import coverImage from "/images/ANXIETY.jpg";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MeetMeAtOurSpot() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [opacity, setOpacity] = useState(0.1);

  useEffect(() => {
    setOpacity(1);
  }, []);

  const containerStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${coverImage})`,
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
          top: isMobile ? "2%" : "5%",
          left: isMobile ? "2%" : "5%",
        }}
      >
        <Link to="/dashboard">
          <FontAwesomeIcon
            icon={faSpotify}
            size={isMobile ? "2x" : "4x"}
            color="gray"
          />
        </Link>
        <Typography
          fontSize={isMobile ? 12 : 16}
          letterSpacing={3}
          fontWeight={600}
          marginTop={isMobile ? 1 : 2.5}
          marginLeft={isMobile ? 1.5 : 3}
          color={"gray"}
        >
          PLAYING FROM TRACK
        </Typography>

        <Box
          sx={{
            textAlign: "start",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            position: "fixed",
            left: isMobile ? "55%" : "17%",
            bottom: isMobile ? "25%" : "30%",
            transform: isMobile ? "translateX(-50%)" : "none",
          }}
        >
          <Typography fontSize={isMobile ? 20 : 50} fontWeight={700}>
            Meet Me At Our Spot
          </Typography>
          <Typography
            fontSize={isMobile ? 12 : 24}
            fontWeight={600}
            color={"darkgray"}
          >
            THE ANXIETY
          </Typography>
        </Box>
        <Image
          duration={0}
          src={coverImage}
          alt="Meet Me At Our Spot by THE ANXIETY"
          style={{
            height: "auto",
            width: isMobile ? "80px" : "160px",
            position: "fixed",
            left: isMobile ? "20%" : "6%",
            bottom: isMobile ? "25%" : "30%",
            transform: isMobile ? "translateX(-50%)" : "none",
          }}
        />
      </Container>
    </>
  );
}

export default MeetMeAtOurSpot;
