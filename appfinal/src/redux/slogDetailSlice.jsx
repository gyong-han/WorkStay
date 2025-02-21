import { createSlice } from "@reduxjs/toolkit";

const slogDetailSlice = createSlice({
  name: "slogDetail",
  initialState: {
    no: "",
    title: "",
    content: "",
    tagline: "",
    fileUrl: "",
    originalName: "",
  },
  reducers: {
    setSlogVo: (state, action) => {
      state.no = action.payload.no;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.tagline = action.payload.tagline;
      state.fileUrl = action.payload.fileUrl;
      state.originalName = action.payload.originalName;
    },
  },
});

export const { setSlogVo } = slogDetailSlice.actions;
export default slogDetailSlice.reducer;
