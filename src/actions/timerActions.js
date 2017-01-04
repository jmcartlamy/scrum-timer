import {
  PLAY_TIMER,
  PAUSE_TIMER,
  START_TIMER

} from '../constants/';

export const startTimer = () => {
  return {
    type: START_TIMER,
    payload: {
      date: +new Date()
    }
  }
};

export const playTimer = () => {
  return {
    type: PLAY_TIMER,
    payload: {
      date: +new Date()
    }
  }
};

export const pauseTimer = () => {
  return {
    type: PAUSE_TIMER,
    payload: {
      date: +new Date()
    }
  }
};