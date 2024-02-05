/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({
  children,
  initialstate,
  reducer,
}: {
  children: React.ReactNode;
  initialstate: any;
  reducer: any;
}) => (
  <StateContext.Provider value={useReducer(reducer, initialstate)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
