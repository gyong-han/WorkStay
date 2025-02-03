import { configureStore } from "@reduxjs/toolkit";
import stationReducer from "./stationSlice";
import terminalReducer from "./terminalSlice";
import counterReducer from "./counterSlice";

const Store = configureStore({
  reducer: {
    station: stationReducer,
    terminal: terminalReducer,
    counter: counterReducer,
  },
});

export default Store;
