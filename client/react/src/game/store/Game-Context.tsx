import { createContext, useReducer, useEffect } from "react";
import { type Dispatch } from "react";

type InitialGameState = {
  isLightMode: boolean;
};

const initialGameState: InitialGameState = {
  isLightMode: false,
};
