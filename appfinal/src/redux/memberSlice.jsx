import { createSlice } from "@reduxjs/toolkit";
import { getPayload } from "../utils/jwtUtil";

const memberSlice = createSlice({
  name: "member",
  initialState: {
    no: null,
    email: null,
    pageNick: "LOGIN",
  },
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      localStorage.setItem("token", token);
      const { no, email, pageNick } = getPayload(token);
      state.no = no;
      state.email = email;
      state.pageNick = pageNick;
    },
    logout: (state) => {
      state.no = null;
      state.email = null;
      state.pageNick = "LOGIN";
    },
  },
});

export const { login, logout } = memberSlice.actions;

export default memberSlice.reducer;
