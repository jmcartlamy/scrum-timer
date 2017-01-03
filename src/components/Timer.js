import React, { Component } from 'react';

class Timer extends Component {

  renderTime() {

    const { start, paused } = this.props;

    if (!start) {
      return 0;
    }
    const date = paused || +new Date();
    console.log(date);

    return Math.floor((date - start) / 1000);
  }

  render() {
    return (
      <span className="container-timer__time centered">{this.renderTime()}</span>
    )
  }
}

export default Timer