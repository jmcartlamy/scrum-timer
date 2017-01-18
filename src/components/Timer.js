import React, { Component } from 'react';
import Sound from 'react-sound';
import cs from 'classnames';

import alarmSound from '../../sounds/alien-alarm.mp3';

class Timer extends Component {

  constructor() {
    super();

    this.onTimeHandler = this.onTimeHandler.bind(this);
    this.onClickToggleInput = this.onClickToggleInput.bind(this);

    this.state = {
      isInputVisible: false,
      playStatus: Sound.status.STOPPED
    }
  }

  componentDidUpdate(prevProps) {
    const { startNumberSeconds, start, paused, exceeded } = this.props;
    const { playStatus } = this.state;
    const startMs = startNumberSeconds * 1000;

    if (!exceeded && !paused && start && (+new Date() - startMs) > start) {
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
      if (+new Date() - startMs < start && prevProps.exceeded) {
        this.props.timerActions.clearExceedTime();
        this.setState({playStatus: Sound.status.STOPPED});
      }
      else if (exceeded && playStatus === 'PAUSED') {
        this.setState({playStatus: Sound.status.PLAYING});
      }
    }
  }

  tick() {
    clearInterval(this.updateComponent);
    this.updateComponent = setInterval(this.forceUpdate.bind(this), 100);
  }

  remainingTime(accuracy = 1) {

    const { startNumberSeconds, start, paused } = this.props;

    if (!start) {
      return startNumberSeconds;
    }

    const date = paused || +new Date();
    return Math.ceil(
        (startNumberSeconds * accuracy) - ((date - start) / (1000 / accuracy))
      ) / accuracy;
  }

  onTimeHandler(e) {
    const { start, paused } = this.props;

    if (paused || !start) {
      const value = e.target.value;
      this.props.timerActions.changeStartTime(value);
    }
  }

  onClickToggleInput() {
    const { isInputVisible } = this.state;

    this.setState({isInputVisible: !isInputVisible});
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
    const { startNumberSeconds, start, paused, exceeded } = this.props;

    const { isInputVisible } = this.state;

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
        <div className="container-timer__containerTime centered" onClick={this.onClickToggleInput}>
          <div
            className={textTimerCSSClassnames}
            type="number">
            {!start ? startNumberSeconds : this.renderTime()}
          </div>
        </div>
        { isInputVisible &&
          <div className="container-timer__containerInputTime centered">
            <input
              type="number"
              min="3"
              max="1800"
              className="container-timer__containerInputTime__inputTime"
              value={startNumberSeconds}
              onChange={this.onTimeHandler}
              disabled={(paused || !start) ? '' : 'disabled'}
            />
          </div>
        }
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