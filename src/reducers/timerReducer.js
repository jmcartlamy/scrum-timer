import {
  CHANGE_START_TIME,
  PLAY_TIMER,
  PAUSE_TIMER,
  START_TIMER,
  EXCEED_TIME,
  CLEAR_EXCEED_TIME
} from '../constants/';

export const initialState = {
  startNumberSeconds: 60,
  start: null,
  paused: null,
  exceeded: false
};

function timerReducer(state = initialState, action) {

  switch (action.type) {

    case CHANGE_START_TIME:
      return {
        ...state,
        startNumberSeconds: action.payload.input
      };
    case START_TIMER:
      return {
        ...state,
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
    case CLEAR_EXCEED_TIME:
      return {
        ...state,
        exceeded: false
      };
    default:
      return state;
  }

}

export default timerReducer;