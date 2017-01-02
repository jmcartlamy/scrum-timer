export const initialState = {
  time: 60,
  playing: false
};


function timerReducer(state = initialState, action) {

  switch (action.type) {
    case 'PLAY_TIMER':
      return {
        time: state.time - 1,
        playing: true
      };
    case 'PAUSE_TIMER':
      return {
        time: state.time,
        playing: false
      };
    case 'RESET_TIMER':
      return {
        time: 60,
        playing: false
      };
    default:
      return {
        time: 60,
        playing: false
      };
  }

}

export default timerReducer;