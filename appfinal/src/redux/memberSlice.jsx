import { createSlice } from "@reduxjs/toolkit";
// import { getPayload } from "../utils/jwtUtil";

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
      // const { no, email, pageNick } = getPayload(token);
      state.no = token.no;
      state.email = token.email;
      state.pageNick = token.pageNick;
    },
    logout: (state) => {
      state.no = null;
      state.email = null;
      state.pageNick = "LOGIN";
      localStorage.removeItem("token"); // 로그아웃 시 JWT 삭제
    },
    findpwd: (state, action) => {
      const token = action.payload;
      state.email = token.email;
    },
  },
});

export const { login, logout, findpwd } = memberSlice.actions;

export default memberSlice.reducer;
