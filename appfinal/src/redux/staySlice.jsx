import { createSlice } from "@reduxjs/toolkit";

const staySlice = createSlice({
  name: "stay",
  initialState: {
    no: "",
    hostNo: "",
    name: "",
    phone: "",
    address: "",
    enrollDate: "",
    tagline: "",
    introduction: "",
    sns: "",
    brn: "",
    season: "",
    filePath: "",
    attachmentFilePaths: [],
    price: "",
    standardGuest: "",
    maxGuest: "",
    checkIn: "",
    checkOut: "",
  },
  reducers: {
    setStayVo: (state, action) => {},
    selectCheckIn: (state, action) => {
      state.checkIn = action.payload.checkIn;
    },
    selectCheckOut: (state, action) => {
      state.checkOut = action.payload.checkOut;
    },
  },
});

export const { setStayVo, selectCheckIn, selectCheckOut } = staySlice.actions;

export default staySlice.reducer;
