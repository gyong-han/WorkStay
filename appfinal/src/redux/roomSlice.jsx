import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    no: "",
    stayNo: "",
    memberNo: "",
    rooms: [],
    name: "",
    enrollDate: "",
    tagline: "",
    introduction: "",
    price: "",
    standardGuest: "",
    maxGuest: "",
    filePath: "",
    attachmentFilePaths: [],
    features: [],
    checkIn: "",
    checkOut: "",
    reservationDate: [],
    reservationDone: [],
    reservationNo: "",
    adult: 0,
    child: 0,
    baby: 0,
  },
  reducers: {
    setRoomVo: (state, action) => {
      state.no = action.payload.no;
      state.stayNo = action.payload.stayNo;
      state.memberNo = action.payload.memberNo;
      state.rooms = action.payload;
      state.name = action.payload.name;
      state.enrollDate = action.payload.enrollDate;
      state.tagline = action.payload.tagline;
      state.introduction = action.payload.introduction;
      state.price = action.payload.price;
      state.standardGuest = action.payload.standardGuest;
      state.maxGuest = action.payload.maxGuest;
      state.features = action.payload.features;
    },
    selectCheckIn: (state, action) => {
      state.checkIn = action.payload.checkIn;
    },
    selectCheckOut: (state, action) => {
      state.checkOut = action.payload.checkOut;
    },
    setMemberCount: (state, action) => {
      state.adult = action.payload.adult;
      state.child = action.payload.kids;
      state.baby = action.payload.baby;
    },
    setRoomData: (state, action) => {
      state.filePath = action.payload[0].filePath;
      state.attachmentFilePaths = action.payload.attachmentFilePaths;
    },
    setStayReservationDate: (state, action) => {
      state.reservationDate = action.payload;
    },
    setStayReservationDone: (state, action) => {
      state.reservationDone = action.payload;
    },
  },
});

export const {
  setRoomVo,
  selectCheckIn,
  selectCheckOut,
  setMemberCount,
  setRoomData,
  setStayReservationDate,
  setStayReservationDone,
} = roomSlice.actions;

export default roomSlice.reducer;
