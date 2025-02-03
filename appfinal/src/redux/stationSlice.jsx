import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  startStation: null,
  endStation: null,
};

const stationSlice = createSlice({
  name: "station",
  initialState,
  reducers: {
    selectStartStation: (state, action) => {
      state.startStation = action.payload;
    },
    selectEndStation: (state, action) => {
      state.endStation = action.payload;
    },
  },
});

export const { selectStartStation, selectEndStation } = stationSlice.actions;
export default stationSlice.reducer;
