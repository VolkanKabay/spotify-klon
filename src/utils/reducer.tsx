/* eslint-disable @typescript-eslint/no-explicit-any */
import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
};

const reducer = (
  state: any,
  action: {
    token: any;
    playlists: any;
    type: any;
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
    default:
      return state;
  }
};

export default reducer;
