import { createSlice } from "@reduxjs/toolkit";

const spaceSlice = createSlice({
  name: "space", // slice 이름
  initialState: {
    no: "",
    memberNo: "",
    address: "서울 강남구 태헤란로 130",
    brn: "",
    businessTypeNo: "",
    attachmentFilePaths: [],
    daytimePrice: "",
    nightPrice: "",
    enrollDate: "",
    filePath: "",
    introduction: "",
    maxGuest: "",
    name: "",
    phone: "",
    sns: "",
    standardGuest: "",
    tagline: "",
    packageNo: "",
    features: [],
    reservationDate: "",
    adult: 0,
    child: 0,
    baby: 0,
    area: "",
    reservationDone: [],
    reservationNo: "",
    payDay: "",
    request: "",
    titleData: "",
    sort: "",
  },
  reducers: {
    setSpaceVo: (state, action) => {
      state.no = action.payload.no;
      state.address = action.payload.address;
      state.brn = action.payload.brn;
      state.businessTypeNo = action.payload.businessTypeNo;
      state.attachmentFilePaths = action.payload.attachmentFilePaths;
      state.daytimePrice = action.payload.daytimePrice;
      state.nightPrice = action.payload.nightPrice;
      state.enrollDate = action.payload.enrollDate;
      state.filePath = action.payload.filePath;
      state.introduction = action.payload.introduction;
      state.maxGuest = action.payload.maxGuest;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.sns = action.payload.sns;
      state.standardGuest = action.payload.standardGuest;
      state.tagline = action.payload.tagline;
      state.features = action.payload.features;
    },
    setPackageType: (state, action) => {
      state.packageType = action.payload.packageType;
    },
    setreservationDate: (state, action) => {
      state.reservationDate = action.payload;
    },
    setMemberCnt: (state, action) => {
      state.adult = action.payload.adult;
      state.child = action.payload.child;
      state.baby = action.payload.baby;
    },
    setArea: (state, action) => {
      state.area = action.payload;
    },
    setReset: (state) => {
      state.no = "";
      state.brn = "";
      state.businessTypeNo = "";
      state.daytimePrice = "";
      state.nightPrice = "";
      state.enrollDate = "";
      state.introduction = "";
      state.maxGuest = "";
      state.name = "";
      state.phone = "";
      state.sns = "";
      state.standardGuest = "";
      state.tagline = "";
      state.packageType = "";
      state.features = [];
      state.reservationDate = "";
      state.adult = 0;
      state.child = 0;
      state.baby = 0;
      state.area = "";
      state.reservationDone = "";
      state.titleData = "";
      state.sort = "";
      state.reservationDate = "";
    },
    setReservationDone: (state, action) => {
      state.reservationDone = action.payload;
    },
    setReservationInfo: (state, action) => {
      state.reservationNo = action.payload.no;
      state.payDay = action.payload.reservationDate;
    },
    setRequest: (state, action) => {
      state.request = action.payload;
    },
    setTitleSearch: (state, action) => {
      state.titleData = action.payload;
    },
    setOrderByStandard: (state, action) => {
      state.sort = action.payload;
    },
    setResetSearch: (state) => {
      state.reservationDate = "";
      state.adult = 0;
      state.child = 0;
      state.baby = 0;
      state.area = "";
      state.reservationDone = "";
      state.titleData = "";
      state.sort = "";
    },
    setLoginMemberNo: (state, action) => {
      state.memberNo = Number(action.payload);
    },
    setDateReset: (state) => {
      state.reservationDone = "";
    },
    setReservationDateReset: (state) => {
      state.reservationDate = "";
    },
  },
});

export const {
  setReservationDateReset,
  setDateReset,
  setSpaceVo,
  setPackageType,
  setreservationDate,
  setMemberCnt,
  setArea,
  setReset,
  setReservationDone,
  setReservationInfo,
  setRequest,
  setTitleSearch,
  setOrderByStandard,
  setResetSearch,
  setLoginMemberNo,
} = spaceSlice.actions;
export default spaceSlice.reducer;
