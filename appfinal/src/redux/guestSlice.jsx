import { createSlice } from "@reduxjs/toolkit";

const guestSlice = createSlice({
  name: "guest",
  initialState: {
    no: "",
    image: "",
    name: "",
    nick: "",
    pwd: "",
    email: "",
    phone: "",
    birthDate: "",
    pageNick: "",
    enrollDate: "",
    hostPermission: "",
  },
  reducers: {
    setGuestVo: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateGuestField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { setGuestVo, updateGuestField } = guestSlice.actions;

export default guestSlice.reducer;
