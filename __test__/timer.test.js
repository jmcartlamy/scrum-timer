import timer, {initialState} from '../src/reducers/timer.js';
import { PLAY_TIMER, PAUSE_TIMER, RESET_TIMER } from '../src/constants/';

test('initial state', () => {
  expect(timer(undefined, { type: 'AZERTY' })).toEqual(initialState);
});

test(PLAY_TIMER, () => {
  const state = {
    playing: false,
    time: 60
  };
  Object.freeze(state);

  const actions = {
    type: PLAY_TIMER,
  };

  expect(
    timer(state, actions)
  ).toEqual({
    playing: true,
    time: 59
  })
});

test(PAUSE_TIMER, () => {
  const state = {
    playing: true,
    time: 45
  };
  Object.freeze(state);

  const actions = {
    type: PAUSE_TIMER,
  };

  expect(
    timer(state, actions)
  ).toEqual({
    playing: false,
    time: 45
  })
});

test(RESET_TIMER, () => {
  const state = {
    playing: true,
    time: 23
  };

  const actions = {
    type: RESET_TIMER,
  };

  expect(
    timer(state, actions)
  ).toEqual({
    playing: false,
    time: 60
  });
});