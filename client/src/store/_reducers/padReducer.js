import * as Types from '../_actions/types';

const padReducer = (state = {}, action) => {
  switch (action.type) {
    case Types.LOAD_MYPAD: {
      return action.payload.mypad;
    }
    case Types.ADD_MYPAD: {
      return action.payload.mypad;
    }
    case Types.REMOVE_MYPAD: {
      return null;
    }
    case Types.UPDATE_MYPAD: {
      return action.payload.mypad;
    }
    default:
      return state;
  }
};

export default padReducer;
