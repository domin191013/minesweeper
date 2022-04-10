import { Action } from "redux";
import { START_LEVEL, OPEN_CELL } from "./constants";

interface IStartLevel extends Action {
  type: typeof START_LEVEL;
  payload: string;
}

interface IOpenCell extends Action {
  type: typeof OPEN_CELL;
  payload: string;
}

interface IActionType extends Action {
  type: string;
  payload: any;
}

export type IActionTypes = IActionType;
