
export const playTimer = inputTime => {
  return {
    type: 'PLAY_TIMER',
  }
};

export const resetTimer = () => {
  return {
    type: 'RESET_TIMER'
  }
}