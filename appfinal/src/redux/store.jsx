import { configureStore } from "@reduxjs/toolkit";
import stationReducer from "./stationSlice";
import terminalReducer from "./terminalSlice";
import counterReducer from "./counterSlice";
import memberReducer from "./memberSlice";
import spaceReducer from "./spaceSlice";

const Store = configureStore({
  reducer: {
    member: memberReducer,
    station: stationReducer,
    terminal: terminalReducer,
    counter: counterReducer,
    space : spaceReducer,
  },
});

export default Store;
