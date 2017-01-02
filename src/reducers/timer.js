
function timerReducer(state = 60, action) {

  switch (action.type) {
    case 'PLAY_TIMER':
      return state - 1;
    case 'RESET_TIMER':
      return 60;
    default:
      return 60;
  }

}

export default timerReducer;