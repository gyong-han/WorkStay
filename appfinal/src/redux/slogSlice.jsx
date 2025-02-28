import { createSlice } from "@reduxjs/toolkit";

const slogSlice = createSlice({
  name: "slog",
  initialState: {
    voList: [],
    pno: 0,
    isLoading: false,
    slogVo: {
      no: "",
      title: "",
      content: "",
      tagline: "",
      fileUrl: "",
      originalName: "",
      titleFileUrl: "",
      memberNo: "",
      nick: "",
      name: "",
      enrollDate: "",
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addSlogVoList: (state, action) => {
      console.log("@@@@@@@@@ action ::: ", action.payload);

      state.voList = [...state.voList, ...action.payload];
    },
    plusPno: (state) => {
      state.pno++;
    },
    resetPno: (state) => {
      state.pno = 0;
      state.voList = [];
    },
    setSlogVo: (state, action) => {
      state.slogVo = action.payload;
    },
  },
});

export const { addSlogVoList, plusPno, resetPno, setLoading, setSlogVo } =
  slogSlice.actions;

export default slogSlice.reducer;
