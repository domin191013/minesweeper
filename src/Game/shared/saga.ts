import { EventChannel, eventChannel } from "redux-saga";
import { call, put, take, fork, ChannelTakeEffect } from "redux-saga/effects";
import {
  CONNECT_SAGA_PUT,
  START_LEVEL,
  GAME_NOT_STARTED,
  PAINT_MAP,
  OPEN_CELL,
  GAME_ENDED
} from "./constants";

const socketServerURL = "wss://hometask.eg1236.com/game1/";

function connect() {
  const socket = new WebSocket(socketServerURL);

  return new Promise((resolve, reject) => {
    socket.onopen = () => resolve({ socket });
    socket.onclose = () => reject(new Error("ws:connect_failed "));
  }).catch((error) => ({ socket, error }));
}

function createSocketChannel(socket: WebSocket): EventChannel<any> {
  return eventChannel((result) => {
    const reconnectHandler = (ping: number) => {
      result({
        type: CONNECT_SAGA_PUT,
        payload: ping,
      });
    };

    const reconnectingHandler = (ping: number) => {
      result({
        type: CONNECT_SAGA_PUT,
        payload: ping,
      });
    };

    socket.onmessage = (message: any) => {
      const data = message.data;
      const command = (data || "").split(":")[0];
      switch (command) {
        case "map": {
          if (data.indexOf("Not started") >= 0) {
            result({
              type: GAME_NOT_STARTED,
              payload: null,
            });
            console.log("Game is not started!");
            break;
          }
          const map = data.trim().substr(5).split("\n");
          result({
            type: PAINT_MAP,
            payload: map,
          });
          console.log("Painting a new map!");
          break;
        }
        case "open": {
          if (data.indexOf("You lose") >= 0) {
            console.log("%c Game Over!", "color: red;");
            result({
              type: GAME_ENDED,
              payload: "lose",
            });
          } else if (data.indexOf("You win") >= 0) {
            console.log("%c You won!", "color: green;", data);
            result({
              type: GAME_ENDED,
              payload: "won",
            });
          }
          break;
        }
        case "help":
        case "new": {
          break;
        }
        default: {
          console.log(
            "%c warning: command not handled yet",
            "color: orange;",
            command,
            data
          );
          break;
        }
      }
    };
    const unsubscribe = () => {};
    return unsubscribe;
  });
}

// watch if the game starts
function* watchStartGame(socket: WebSocket) {
  while (true) {
    const { payload } = yield take(START_LEVEL);
    console.log("Saga - new start game request");
    socket.send(`new ${payload}`);
    socket.send("map");
  }
}

// watch if the cell is opend
function* watchOpenCell(socket: WebSocket) {
  while (true) {
    const { payload } = yield take(OPEN_CELL);
    console.log("Saga - open cell request");
    socket.send(`open ${payload}`);
    socket.send("map");
  }
}

function* watchTask(socket: WebSocket) {
  yield fork(watchStartGame, socket);
  yield fork(watchOpenCell, socket);
}

function* putAction(socket: WebSocket) {
  const event: EventChannel<any> = yield call(createSocketChannel, socket);
  while (true) {
    let action: ChannelTakeEffect<any> = yield take(event);
    console.log("flow action: ", action);
    yield put(action);
  }
}

function* task(socket: WebSocket) {
  yield fork(putAction, socket);
  yield fork(watchTask, socket);
}

export function* socketRootSaga(): Generator<any, any, any> {
  const { socket, error } = yield call(connect);

  if (!error) {
    console.log("It's now connected to server");
    socket.send("help");
    yield put({ type: CONNECT_SAGA_PUT, payload: "Connected" });
    return yield fork(task, socket);
  } else {
    console.log("The connection is disconnected");
    put({ type: CONNECT_SAGA_PUT, payload: "Disconnected" });
    return null;
  }
}
