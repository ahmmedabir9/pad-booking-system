import * as Types from '../_actions/types';

const bookingReducer = (state = [], action) => {
  switch (action.type) {
    case Types.LOAD_MYBOOKING: {
      return action.payload.mybooking;
    }
    case Types.UPDATE_MYBOOKING: {
      let mybooking = [...state];
      return mybooking.map((booking) => {
        if (booking._id === action.payload.mybooking._id) {
          return action.payload.mybooking;
        }
        return booking;
      });
    }
    case Types.REMOVE_MYBOOKING: {
      let mybooking = [...state];
      return mybooking.filter((booking) => {
        return booking._id !== action.payload.id;
      });
    }
    default:
      return state;
  }
};

export default bookingReducer;
