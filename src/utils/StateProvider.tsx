/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext<any>(undefined);

export const StateProvider: React.FC<{
  children: React.ReactNode;
  initialState: any;
  reducer: any;
}> = ({ children, initialState, reducer }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
