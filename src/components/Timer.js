import React, { Component } from 'react';
import cs from 'classnames';

import { START_NUMBER_SECONDS } from '../constants/';

const START_MS = START_NUMBER_SECONDS * 1000;

class Timer extends Component {

  componentDidUpdate(prevProps) {
    const { start, paused, exceeded } = this.props;

    if (!exceeded && !paused && start && (+new Date() - START_MS) > start) {
      this.props.timerActions.exceedTime();
    }
    else if(!prevProps.start && start) {
      this.tick();
    }
    else if(!prevProps.paused && paused) {
      clearInterval(this.updateComponent);
    }
    else if(prevProps.paused && !paused) {
      this.tick()
    }
  }

  tick() {
    clearInterval(this.updateComponent);
    this.updateComponent = setInterval(this.forceUpdate.bind(this), 100);
  }

  remainingTime(accuracy = 1) {

    const { start, paused } = this.props;

    if (!start) {
      return START_NUMBER_SECONDS;
    }
    const date = paused || +new Date();
    return Math.ceil(
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
    const { start, paused, exceeded } = this.props;

    const textTimerCSSClassnames = cs(
      'container-timer__containerTime__time centered',
      {
        'color-green': !paused && !exceeded,
        'color-yellow': paused && !exceeded,
        'color-red': exceeded
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

export default Timer;