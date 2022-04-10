import { startLevel, openCell } from "./action";
export const CONNECT_GAME = "CONNECT_GAME";
export const START_LEVEL = "START_LEVEL";
export const GAME_NOT_STARTED = "GAME_NOT_STARTED";
export const PAINT_MAP = "PAINT_MAP";
export const OPEN_CELL = "OPEN_CELL";
export const GAME_ENDED = "GAME_ENDED";

export const CONNECT_SAGA_PUT = "CONNECT_SAGA_PUT";

export interface IState {
  map: Array<any>;
  gameStarted: boolean;
  currentLevel: string;
  gameOver: number; //0: not yet ended, 1: won, 2: lose
  message: string;
}

interface IDispatch {
  startLevel: typeof startLevel;
  openCell: typeof openCell;
}

export type IProp = IState & IDispatch;