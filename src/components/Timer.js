import React, { Component } from 'react';
import cs from 'classnames';

import { START_NUMBER_SECONDS } from '../constants/';

class Timer extends Component {

  componentDidUpdate() {
    const { allottedTimeActions, exceed } = this.props;
    const remainingTime = this.remainingTime();

    if (!exceed && remainingTime < 0) {
      allottedTimeActions.exceedTime();
    }
  }

  remainingTime(accuracy = 1) {

    const { start, paused } = this.props;

    if (!start) {
      return START_NUMBER_SECONDS;
    }
    const date = paused || +new Date();
    return Math.floor(
        (START_NUMBER_SECONDS * accuracy) - ((date - start) / (1000 / accuracy))
      ) / accuracy;
  }

  renderTime() {
    const remainingTime = this.remainingTime();

    return remainingTime >= 0 ? remainingTime : 0;
  }

  renderOvertime() {
    const remainingTime = this.remainingTime(10);

    return remainingTime < 0 ? `Exceed time : ${Math.abs(remainingTime).toFixed(1)}s` : '';
  }

  render() {
    const { start, paused, exceed } = this.props;

    const textTimerCSSClassnames = cs(
      'container-timer__containerTime__time centered',
      {
        'color-green': !paused && !exceed,
        'color-yellow': paused && !exceed,
        'color-red': exceed
      }
    );

    return (
      <div className="container-timer">
        <div className="container-timer__containerTime centered">
          <span className={textTimerCSSClassnames}>
            {!start ? START_NUMBER_SECONDS : this.renderTime()}
          </span>
        </div>
        <div className="container-timer__containerOvertime centered">
          <span className="container-timer__containerOvertime__overtime">
            {this.renderOvertime()}
          </span>
        </div>
      </div>
    )
  }
}

export default Timer