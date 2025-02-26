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
    titleFileUrl: "",
  },
  reducers: {
    setSlogVo: (state, action) => {
      state.no = action.payload.no;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.tagline = action.payload.tagline;
      state.fileUrl = action.payload.fileUrl;
      state.originalName = action.payload.originalName;
      state.titleFileUrl = action.payload.titleFileUrl;
    },
  },
});

export const { setSlogVo } = slogDetailSlice.actions;
export default slogDetailSlice.reducer;
