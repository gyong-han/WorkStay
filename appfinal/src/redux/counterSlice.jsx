
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
    adult: 0,
    child: 0,
    baby: 0,
   },
  reducers: {
    INCREMENT_ADULT: (state, action) => {
      state.adult += 1;
    },
    DECREMENT_ADULT: (state, action) => {
      state.adult -= 1;
    },
    INCREMENT_CHILD: (state, action) => {
      state.child += 1;
    },
    DECREMENT_CHILD: (state, action) => {
      state.child -= 1;
    },
    INCREMENT_BABY: (state, action) => {
      state.baby += 1;
    },
    DECREMENT_BABY: (state, action) => {
      state.baby -= 1;
    },
    RESET :(state,action)=>{
      state.adult=0;
      state.baby=0;
      state.child=0;
    }
  },
});

export default counterSlice.reducer;
export const { INCREMENT_ADULT, DECREMENT_ADULT,INCREMENT_CHILD,DECREMENT_CHILD,
  INCREMENT_BABY,DECREMENT_BABY,RESET
 } = counterSlice.actions;