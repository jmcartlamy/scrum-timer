import { PLAY_TIMER, PAUSE_TIMER, START_TIMER, EXCEED_TIME } from '../constants/';

export const initialState = {
  start: null,
  paused: null,
  exceeded: false
};

function timerReducer(state = initialState, action) {

  switch (action.type) {

    case START_TIMER:
      return {
        start: action.payload.date,
        paused: null,
        exceeded: false
      };
    case PLAY_TIMER:
      const offset = state.paused - state.start;
      return {
        ...state,
        start: action.payload.date - offset,
        paused: null
      };
    case PAUSE_TIMER:
      return {
        ...state,
        paused: action.payload.date
      };
    case EXCEED_TIME:
      return {
        ...state,
        exceeded: true
      };
    default:
      return state;
  }

}

export default timerReducer;