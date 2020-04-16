import * as Types from '../_actions/types';

const shiftReducer = (state = [], action) => {
  switch (action.type) {
    case Types.LOAD_MYSHIFT: {
      return action.payload.myshift;
    }
    case Types.ADD_MYSHIFT: {
      let myshift = [...state];
      myshift.unshift(action.payload.shift);
      return myshift;
    }
    case Types.REMOVE_MYSHIFT: {
      let myshift = [...state];
      return myshift.filter((shift) => {
        return shift._id !== action.payload.id;
      });
    }
    default:
      return state;
  }
};

export default shiftReducer;
