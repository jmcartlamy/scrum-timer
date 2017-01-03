import { PLAY_TIMER, PAUSE_TIMER, START_TIMER } from '../constants/';

export const initialState = {
  start: null,
  paused: null
};

function timerReducer(state = initialState, action) {

  switch (action.type) {

    case START_TIMER:
      return {
        start: action.payload.date,
        paused: null
      };
    case PLAY_TIMER:
      const offset = state.start - state.paused;
      return {
        start: action.payload.date - offset,
        paused: null
      };
    case PAUSE_TIMER:
      return {
        start: state.start,
        paused: action.payload.date
      };
    default:
      return {
        start: null,
        paused: null
      };
  }

}

export default timerReducer;