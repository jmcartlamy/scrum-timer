import { PLAY_TIMER, PAUSE_TIMER, RESET_TIMER } from '../constants/';

export const playTimer = () => {
  return {
    type: PLAY_TIMER,
  }
};

export const pauseTimer = () => {
  return {
    type: PAUSE_TIMER,
  }
};

export const resetTimer = () => {
  return {
    type: RESET_TIMER
  }
};