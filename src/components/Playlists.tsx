import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/Constants";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

interface AlbumCoverProps {
  imageUrl?: string;
}
export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-type": "application/json",
            },
          }
        );
        const { items } = response.data;
        const playlists = items.map(
          ({
            name,
            id,
            type,
            owner,
            images,
          }: {
            name: string;
            id: string;
            type: string;
            owner: { display_name: string };
            images: Array<{ url: string }> | undefined;
          }) => {
            return {
              name,
              id,
              type,
              owner,
              image: images?.[0]?.url ?? null,
            };
          }
        );

        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };
    getPlaylistData();
  }, [token, dispatch]);

  const handlePlaylistClick = (id: string) => {
    dispatch({
      type: reducerCases.SET_SELECTED_PLAYLIST_ID,
      selectedPlaylistId: id,
    });
  };
  return (
    <Container>
      <ul>
        {playlists.map(
          ({
            name,
            id,
            type,
            owner,
            image,
          }: {
            name: string;
            id: string;
            type: string;
            owner: { display_name: string };
            image: string;
          }) => (
            <li key={id} onClick={() => handlePlaylistClick(id)}>
              <PlaylistDetails>
                <AlbumCover imageUrl={image} />
                <PlaylistName>
                  <Name>{name}</Name>

                  <DetailsRow>
                    <Typography>{type}</Typography>
                    <Typography>{owner.display_name}</Typography>
                  </DetailsRow>
                </PlaylistName>
              </PlaylistDetails>
            </li>
          )
        )}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  height: 1000px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    height: 55vh;
    max-height: 100%;
    padding: 0 8px;
  }
`;

const PlaylistDetails = styled.div`
  display: flex;
  align-items: center;
  height: 50%;
  width: 100%;
  text-align: left;
  cursor: pointer;
  margin: 2px 4px;
  border-radius: 8px;
  :hover {
    background-color: #282828;
  }
`;

const PlaylistName = styled.div`
  margin-left: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;

const Name = styled.span`
  margin-bottom: 0px;
`;

const DetailsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
export const AlbumCover = styled.div<AlbumCoverProps>`
  width: 70px;
  height: 55px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-top: 3px;
  margin-bottom: 3px;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : "none"};
`;
