/* eslint-disable @typescript-eslint/no-explicit-any */
import { reducerCases } from "./Constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: { userId: null, userName: null, userImage: null },
};

const reducer = (
  state: any,
  action: {
    token: any;
    playlists: any;
    type: any;
    userInfo: any;
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
    default:
      return state;
  }
};

export default reducer;
