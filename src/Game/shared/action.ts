import { IActionTypes } from "./action.types";
import { START_LEVEL, OPEN_CELL } from "./constants";

export function startLevel(level: string): IActionTypes {
  console.log("START LEVEL", " - ", level);
  return {
    type: START_LEVEL,
    payload: level,
  };
}

export function openCell(cell: string): IActionTypes {
  console.log("OPEN LEVEL", " - ", cell);
  return {
    type: OPEN_CELL,
    payload: cell,
  };
}