import { createSlice } from "@reduxjs/toolkit";

const slogRecSlice = createSlice({
  name: "slogRec",
  initialState: {
    recPlaces: [],
  },
  reducers: {
    setRecVo: (state, action) => {
      state.recPlaces = action.payload;
    },
  },
});

export const { setRecVo } = slogRecSlice.actions;
export default slogRecSlice.reducer;
