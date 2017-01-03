import React, { Component } from 'react';
import { START_NUMBER_SECONDS } from '../constants/';

class Timer extends Component {

  renderTime() {

    const { start, paused } = this.props;

    if (!start) {
      return START_NUMBER_SECONDS;
    }
    const date = paused || +new Date();
    const time = Math.floor(START_NUMBER_SECONDS - ((date - start) / 1000));

    return time >= 0 ? time : 0;
  }

  render() {
    const { start } = this.props;

    return (
      <span className="container-timer__time centered">
        {!start ? '01:00': this.renderTime()}
      </span>
    )
  }
}

export default Timer