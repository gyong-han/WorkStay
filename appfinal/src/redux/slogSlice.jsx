import { createSlice } from "@reduxjs/toolkit";

const slogSlice = createSlice({
  name: "slog",
  initialState: {
    voList: [],
    pno: 0,
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addSlogVoList: (state, action) => {
      state.voList = [...state.voList, ...action.payload];
    },
    plusPno: (state) => {
      state.pno++;
    },
    resetPno: (state) => {
      state.pno = 0;
      state.voList = [];
    },
  },
});

export const { addSlogVoList, plusPno, resetPno, setLoading } =
  slogSlice.actions;
export default slogSlice.reducer;
