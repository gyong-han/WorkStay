import { createSlice } from "@reduxjs/toolkit";

const staySlice = createSlice({
  name: "stay",
  initialState: {
    no: "",
    hostNo: "",
    memberNo: "",
    name: "",
    phone: "",
    address: "",
    enrollDate: "",
    tagline: "",
    introduction: "",
    sns: "",
    brn: "",
    season: "",
    titleData: "",
    filePath: "",
    attachmentFilePaths: [],
    price: "",
    standardGuest: "",
    maxGuest: "",
    checkIn: "",
    checkOut: "",
    sort: "latest",
    rooms: [],
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
      state.address = action.payload.address;
      state.rooms = action.payload.rooms;
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
    setSearch: (state, action) => {
      state.title = action.payload;
    },
    setStayLoginMemberNo: (state, action) => {
      state.memberNo = Number(action.payload);
    },
    setReset: (state, action) => {
      state.address = "";
      state.sort = "";
      state.title = "";
      state.reservationDate = "";
      state.checkIn = "";
      state.checkOut = "";
    },
  },
});

export const {
  setStayVo,
  selectCheckIn,
  selectCheckOut,
  setStayData,
  setAddress,
  setSearch,
  setSort,
  setStayLoginMemberNo,
  setReset,
} = staySlice.actions;

export default staySlice.reducer;
