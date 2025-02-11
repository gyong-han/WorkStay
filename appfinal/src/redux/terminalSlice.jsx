import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startTerminal: "",
  endTerminal: "",
};

const terminalSlice = createSlice({
  name: "terminal",
  initialState,
  reducers: {
    selectStartTerminal: (state, action) => {
      state.startTerminal = action.payload;
    },

    selectEndTerminal: (state, action) => {
      state.endTerminal = action.payload;
    },
  },
});

export default terminalSlice.reducer;
export const { selectStartTerminal, selectEndTerminal } = terminalSlice.actions;
