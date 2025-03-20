import { configureStore } from "@reduxjs/toolkit";
import stationReducer from "./stationSlice";
import terminalReducer from "./terminalSlice";
import counterReducer from "./counterSlice";
import memberReducer from "./memberSlice";
import spaceReducer from "./spaceSlice";
import stayReducer from "./staySlice";
import roomReducer from "./roomSlice";
import guestReducer from "./guestSlice";
import slogReducer from "./slogSlice";
import slogDetailReducer from "./slogDetailSlice";
import slogRecReducer from "./slogRecSlice";

const Store = configureStore({
  reducer: {
    guest: guestReducer,
    member: memberReducer,
    station: stationReducer,
    terminal: terminalReducer,
    counter: counterReducer,
    space: spaceReducer,
    stay: stayReducer,
    room: roomReducer,
    slog: slogReducer,
    slogDetail: slogDetailReducer,
    slogRec: slogRecReducer,
  },
});

export default Store;
