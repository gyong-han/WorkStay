import { createSlice } from "@reduxjs/toolkit";
import { getPayload } from "../utils/jwtUtil"; // JWT에서 데이터 추출하는 함수

// 로컬 스토리지에서 토큰 불러오기
const token = localStorage.getItem("token");

const initialState = {
  no: null,
  email: null,
  pageNick: "LOGIN",
};

// 토큰이 있으면 초기 상태 복구
if (token) {
  try {
    const no = getPayload(token, "no");
    const email = getPayload(token, "email");
    const pageNick = getPayload(token, "pageNick");
    initialState.no = no;
    initialState.email = email;
    initialState.pageNick = pageNick;
  } catch (error) {
    console.error("토큰 파싱 실패:", error);
    localStorage.removeItem("token"); // 잘못된 토큰이면 삭제
  }
}

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      state.no = token.no;
      state.email = token.email;
      state.pageNick = token.pageNick;
    },
    logout: (state) => {
      state.no = null;
      state.email = null;
      state.pageNick = "LOGIN";
      localStorage.removeItem("token"); // 로그아웃 시 토큰 삭제
      localStorage.removeItem("kakao_a6735a34948b72ea00b68392d6281037");
    },
    findpwd: (state, action) => {
      state.email = action.payload.email;
    },
  },
});

export const { login, logout, findpwd } = memberSlice.actions;
export default memberSlice.reducer;
