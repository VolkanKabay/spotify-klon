/* eslint-disable @typescript-eslint/no-explicit-any */
import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: { userId: null, userName: null, userImage: null },
  selectedPlaylistId: null,
  selectedPlaylist: null,
  currentlyPlaying: null,
  savedTracks: [],
  topTracks: [],
};

const reducer = (
  state: any,
  action: {
    token: any;
    playlists: any;
    type: any;
    userInfo: any;
    selectedPlaylist: any;
    selectedPlaylistId: any;
    currentlyPlaying: any;
    savedTracks: any;
    topTracks: any;
  }
) => {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    case reducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case reducerCases.SET_USER: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    case reducerCases.SET_PLAYLIST: {
      return {
        ...state,
        selectedPlaylist: action.selectedPlaylist,
      };
    }
    case reducerCases.SET_SELECTED_PLAYLIST_ID: {
      return {
        ...state,
        selectedPlaylistId: action.selectedPlaylistId,
      };
    }
    case reducerCases.SET_CURRENTLY_PLAYING: {
      return {
        ...state,
        currentlyPlaying: action.currentlyPlaying,
      };
    }
    case reducerCases.SET_SAVED_TRACKS: {
      return {
        ...state,
        savedTracks: action.savedTracks,
      };
    }
    case reducerCases.SET_TOP_TRACKS: {
      return {
        ...state,
        topTracks: action.topTracks,
      };
    }

    default:
      return state;
  }
};

export default reducer;
