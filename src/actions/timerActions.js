import {
  CHANGE_START_TIME,
  PLAY_TIMER,
  PAUSE_TIMER,
  START_TIMER,
  EXCEED_TIME

} from '../constants/';

export const changeStartTime = inputNumber => {
  return {
    type: CHANGE_START_TIME,
    payload: {
      input: inputNumber
    }
  }
};


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

export const exceedTime = () => {
  return {
    type: EXCEED_TIME
  }
};