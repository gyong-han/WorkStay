import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    no: "",
    stayNo: "",
    memberNo: "",
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
    adult: 0,
    child: 0,
    baby: 0,
  },
  reducers: {
    setRoomVo: (state, action) => {
      state.no = action.payload.no;
      state.stayNo = action.payload.stayNo;
      state.memberNo = action.payload.memberNo;
      state.name = action.payload.name;
      state.enrollDate = action.payload.enrollDate;
      state.tagline = action.payload.tagline;
      state.introduction = action.payload.introduction;
      state.price = action.payload.price;
      state.standardGuest = action.payload.standardGuest;
      state.maxGuest = action.payload.maxGuest;
      state.filePath = action.payload.filePath;
      state.attachmentFilePaths = action.payload.attachmentFilePaths;
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
  },
});

export const { setRoomVo, selectCheckIn, selectCheckOut, setMemberCount } =
  roomSlice.actions;

export default roomSlice.reducer;
