//spaceSlice
import { createSlice } from '@reduxjs/toolkit';

const spaceSlice = createSlice({
  name: 'space', // slice 이름
  initialState:{
    address: '서울 강남구 태헤란로 130',
    brn : '',
    businessTypeNo:'',
    attachmentFilePaths:[],
    daytimePrice :'',
    nightPrice :'',
    enrollDate:'',
    filePath:'',
    introduction:'',
    maxGuest:'',
    name :'',
    phone:'',
    sns :'',
    standardGuest:'',
    tagline:'',
    packageType : '',
    features :[],

  },
  reducers: {
    setSpaceVo : (state,action)=>{
    state.address = action.payload.address;
    state.brn = action.payload.brn;
    state.businessTypeNo = action.payload.businessTypeNo;
    state.attachmentFilePaths= action.payload.attachmentFilePaths;
    state.daytimePrice = action.payload.daytimePrice;
    state.nightPrice = action.payload.nightPrice;
    state.enrollDate= action.payload.enrollDate;
    state.filePath= action.payload.filePath;
    state.introduction= action.payload.introduction;
    state.maxGuest= action.payload.maxGuest;
    state.name = action.payload.name;
    state.phone= action.payload.phone;
    state.sns = action.payload.sns;
    state.standardGuest= action.payload.standardGuest;
    state.tagline= action.payload.tagline;
    state.features =action.payload.features;
    },
    setPackageType : (state,action)=>{
      state.packageType = action.payload.packageType;
    }
    
  },
});


export const { setSpaceVo,setPackageType } = spaceSlice.actions;
export default spaceSlice.reducer;
