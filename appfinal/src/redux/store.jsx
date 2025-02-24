import { configureStore } from "@reduxjs/toolkit";
import stationReducer from "./stationSlice";
import terminalReducer from "./terminalSlice";
import counterReducer from "./counterSlice";
import memberReducer from "./memberSlice";
import spaceReducer from "./spaceSlice";
import stayReducer from "./staySlice";
import roomReducer from "./roomSlice";
import guestReducer from "./guestSlice";

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
  },
});

export default Store;
