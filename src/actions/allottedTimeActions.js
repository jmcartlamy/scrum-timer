import {
  EXCEED_TIME,
  RESET_TIME
} from '../constants/';

export const exceedTime = () => {
  return {
    type: EXCEED_TIME,
  }
};

export const resetTime = () => {
  return {
    type: RESET_TIME,
  }
};