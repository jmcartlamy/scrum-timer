import { EXCEED_TIME, RESET_TIME } from '../constants/';

function allottedTimeReducer(state = { exceed: false }, action) {

  switch (action.type) {

    case EXCEED_TIME:
      return {
        exceed: true
      };
    case RESET_TIME:
      return {
        exceed: false
      };
    default:
      return state;
  }

}

export default allottedTimeReducer;