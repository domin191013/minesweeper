import { IState } from "./constants";
import { IActionTypes } from "./action.types";
import {
  START_LEVEL,
  GAME_NOT_STARTED,
  PAINT_MAP,
  GAME_ENDED,
} from "./constants";

const initState: IState = {
  map: [],
  gameStarted: true,
  currentLevel: "0",
  gameOver: 0,
  message: "",
};

export default function Reducer(
  state: IState = initState,
  action: IActionTypes
): IState {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case START_LEVEL:
      newState.gameOver = 0;
      newState.currentLevel = action.payload;
      break;

    case GAME_NOT_STARTED:
      newState.gameStarted = false;
      newState.map = [];
      break;

    case PAINT_MAP:
      newState.map = action.payload;
      newState.gameStarted = true;
      break;

    case GAME_ENDED:
      if (action.payload === "won")
        newState.gameOver = 1;
      else
        newState.gameOver = 2;
      break;
  }
  return newState;
}
