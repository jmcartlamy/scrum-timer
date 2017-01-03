import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as timerActions from '../actions/timerActions.js';

class App extends Component {

  constructor() {
    super();

    this.tick = this.tick.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.onClickPause = this.onClickPause.bind(this);
    this.onClickPlay = this.onClickPlay.bind(this);
  }

  tick() {
    clearInterval(this.updateComponent);
    this.updateComponent = setInterval(this.forceUpdate.bind(this), 100);
  }

  onClickStart() {
    const { actions } = this.props;
    actions.startTimer();
    this.tick();
  }

  onClickPlay() {
    const { actions } = this.props;
    actions.playTimer();
    this.tick();
  }

  onClickPause() {
    const { actions } = this.props;
    actions.pauseTimer();
    clearInterval(this.updateComponent);
  }

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
    const { start, paused } = this.props;

    return (
      <div className="scrum-app">
        <div className="container-timer centered">
          <span className="container-timer__time centered">{this.renderTime()}</span>
        </div>
        <div className="container-buttons">

          <div className="container-buttons__grid-1-2">
            <button type="button" onClick={this.onClickStart} className="container-buttons__grid-1-2__button">
              {start ? 'Next' : 'Start'}
            </button>
          </div>

          <div className="container-buttons__grid-1-2">
            {paused ?
              <button type="button" onClick={this.onClickPlay} className="container-buttons__grid-1-2__button">
                Play
              </button> :
              <button type="button" onClick={this.onClickPause} className="container-buttons__grid-1-2__button">
                Pause
              </button>
            }
          </div>

        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    start: state.timerReducer.start,
    paused: state.timerReducer.paused
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(timerActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
