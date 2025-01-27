import { createStore } from "redux";

const initState = {
  adult: {
    adultCnt: 0,
  },
  child: {
    childCnt: 0,
  },
  baby: {
    cnt: 0,
  },
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INCREMENT_ADULT":
      return {
        ...state,
        adult: { ...state.adult, adultCnt: state.adult.adultCnt + 1 },
      };
    case "DECREMENT_ADULT":
      return {
        ...state,
        adult: { ...state.adult, adultCnt: state.adult.adultCnt - 1 },
      };
    case "INCREMENT_CHILD":
      return {
        ...state,
        child: { ...state.child, childCnt: state.child.childCnt + 1 },
      };
    case "DECREMENT_CHILD":
      return {
        ...state,
        child: { ...state.child, childCnt: state.child.childCnt - 1 },
      };
    case "INCREMENT_BABY":
      return { ...state, baby: { ...state.baby, cnt: state.baby.cnt + 1 } };
    case "DECREMENT_BABY":
      return { ...state, baby: { ...state.baby, cnt: state.baby.cnt - 1 } };
    default:
      return state;
  }
};

const Store = createStore(reducer);

export default Store;
