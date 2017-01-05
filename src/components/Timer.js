import React, { Component } from 'react';
import Sound from 'react-sound';
import cs from 'classnames';

import alarmSound from '../../sounds/alien-alarm.mp3';

import { START_NUMBER_SECONDS } from '../constants/';

const START_MS = START_NUMBER_SECONDS * 1000;

class Timer extends Component {

  constructor() {
    super();

    this.state = {
      playStatus: Sound.status.STOPPED
    }
  }

  componentDidUpdate(prevProps) {
    const { start, paused, exceeded } = this.props;
    const { playStatus } = this.state;

    if (!exceeded && !paused && start && (+new Date() - START_MS) > start) {
      this.props.timerActions.exceedTime();
      this.setState({playStatus: Sound.status.PLAYING});
    }
    else if(!prevProps.start && start) {
      this.tick();
      this.setState({playStatus: Sound.status.STOPPED});
    }
    else if(prevProps.exceeded === true && exceeded === false && prevProps.start !== start) {
      this.setState({playStatus: Sound.status.STOPPED});
    }

    if(!prevProps.paused && paused && playStatus === 'PLAYING') {
      clearInterval(this.updateComponent);
      this.setState({playStatus: Sound.status.PAUSED});
    }
    else if(prevProps.paused && !paused) {
      this.tick();
      if (exceeded && playStatus === 'PAUSED') {
        this.setState({playStatus: Sound.status.PLAYING});
      }
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
        <Sound
          url={alarmSound}
          playFromPosition={0}
          playStatus={this.state.playStatus}
          onFinishedPlaying={() => this.setState({playStatus: Sound.status.STOPPED})}
        />

      </div>
    )
  }
}

export default Timer;