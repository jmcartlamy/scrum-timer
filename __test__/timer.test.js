import timer, {initialState} from '../src/reducers/timer.js';
import { PLAY_TIMER, PAUSE_TIMER, START_TIMER } from '../src/constants/';

test('initial state', () => {
  expect(timer(undefined, { type: 'AZERTY' })).toEqual(initialState);
});

test(START_TIMER, () => {
  const state = {
    start: null,
    paused: null
  };

  const action = {
    type: START_TIMER,
    payload: {
      date: +new Date()
    }
  };

  expect(
    timer(state, action)
  ).toEqual({
    start: action.payload.date,
    paused: null
  });
});

test(PLAY_TIMER, () => {
  const state = {
    start: +new Date() - 9000,
    paused: +new Date() - 4000
  };
  Object.freeze(state);

  const action = {
    type: PLAY_TIMER,
    payload: {
      date: +new Date()
    }
  };

  expect(
    timer(state, action)
  ).toEqual({
    start: action.payload.date - (state.start - state.paused),
    paused: null
  })
});

test(PAUSE_TIMER, () => {
  const state = {
    start: +new Date() - 15000,
    paused: 60
  };
  Object.freeze(state);

  const action = {
    type: PAUSE_TIMER,
    payload: {
      date: +new Date()
    }
  };

  expect(
    timer(state, action)
  ).toEqual({
    start: +new Date() - 15000,
    paused: action.payload.date
  })
});
