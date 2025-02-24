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
    sort: "latest",
  },
  reducers: {
    setStayVo: (state, action) => {
      state.no = action.payload.no;
      state.hostNo = action.payload.hostNo;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.enrollDate = action.payload.enrollDate;
      state.tagline = action.payload.tagline;
      state.introduction = action.payload.introduction;
      state.sns = action.payload.sns;
      state.thumbnail = action.payload.thumbnail;
    },
    selectCheckIn: (state, action) => {
      state.checkIn = action.payload.checkIn;
    },
    selectCheckOut: (state, action) => {
      state.checkOut = action.payload.checkOut;
    },
    setStayData: (state, action) => {
      state.filePath = action.payload.filePath;
      state.attachmentFilePaths = action.payload.attachmentFilePaths;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  setStayVo,
  selectCheckIn,
  selectCheckOut,
  setStayData,
  setAddress,
  setSort,
} = staySlice.actions;

export default staySlice.reducer;
