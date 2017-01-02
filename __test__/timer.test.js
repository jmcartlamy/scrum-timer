import timer from '../src/reducers/timer.js';

test('initial state', () => {
  expect(timer(undefined, { type: 'AZERTY' })).toBe(60);
});

test('PLAY_TIMER', () => {
  expect(
    timer(60, { type: 'PLAY_TIMER' })).toBe(59);
});

test('RESET_TIMER', () => {
  expect(
    timer(23, { type: 'RESET_TIMER' })
  ).toBe(60);
});