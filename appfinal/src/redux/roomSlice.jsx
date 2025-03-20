import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    no: "",
    stayNo: "",
    memberNo: "",
    rooms: [],
    name: "",
    stayName: "",
    enrollDate: "",
    tagline: "",
    introduction: "",
    price: "",
    standardGuest: "",
    maxGuest: "",
    extraGuestFee: 30000,
    filePath: "",
    title: "",
    attachmentFilePaths: [],
    features: [],
    checkIn: "",
    checkOut: "",
    reservationDate: [],
    reservationDone: [],
    reservationNo: "",
    queenSize: 0,
    doubleSize: 0,
    singleSize: 0,
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
      state.stayName = action.payload.stayName;
      state.queenSize = action.payload.queenSize;
      state.doubleSize = action.payload.doubleSize;
      state.singleSize = action.payload.singleSize;
    },
    selectCheckIn: (state, action) => {
      state.checkIn = action.payload.checkIn;
    },
    selectCheckOut: (state, action) => {
      state.checkOut = action.payload.checkOut;
    },
    setMemberCount: (state, action) => {
      state.adult = action.payload.adult;
      state.child = action.payload.child;
      state.baby = action.payload.baby;
    },
    setRoomData: (state, action) => {
      state.filePath = Array.isArray(action.payload)
        ? action.payload[0]?.filePath
        : action.payload.filePath;
      state.attachmentFilePaths = action.payload.attachmentFilePaths;
    },
    setStayReservationDate: (state, action) => {
      state.reservationDate = action.payload;
    },
    setStayReservationDone: (state, action) => {
      state.reservationDone = action.payload;
    },
    setStayReservationInfo: (state, action) => {
      state.reservationNo = action.payload.no;
      state.payDay = action.payload.reservationDate;
    },
    setRoomLoginMemberInfo: (state, action) => {
      state.memberNo = Number(action.payload);
    },
    setResetFilter: (state) => {
      state.reservationDate = [];
      state.adult = 0;
      state.child = 0;
      state.baby = 0;
      state.area = "";
      state.title = "";
      state.sort = "";
      state.checkIn = "";
      state.checkOut = "";
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
  setStayReservationInfo,
  setRoomLoginMemberInfo,
  setResetFilter,
} = roomSlice.actions;

export default roomSlice.reducer;
