import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as timerActions from '../actions/timerActions.js';

class App extends Component {

  constructor() {
    super();

    this.onClickReset = this.onClickReset.bind(this);
    this.onClickPause = this.onClickPause.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
  }

  onClickReset() {
    const { actions } = this.props;
    actions.resetTimer();
  }

  onClickPause() {
    clearInterval(this.playingTime);
    const { actions } = this.props;
    actions.pauseTimer();
  }

  onClickStart() {

    const { actions } = this.props;

    actions.playTimer();

    this.playingTime = setInterval(() => {
      actions.playTimer();
    }, 1000);
  }


  render() {
    const { time, playing } = this.props;

    return (
      <div className="scrum-app">
        <div className="container-timer centered">
          <span className="container-timer__time centered">{time >= 0 ? time : 0}</span>
        </div>
        <div className="container-buttons">
          <div className="container-buttons__grid-1-2">
            <button type="button" onClick={this.onClickReset} className="container-buttons__grid-1-2__button">Reset</button>
        </div>
          {time > 0 &&
          <div className="container-buttons__grid-1-2">
              <button type="button" onClick={this.onClickStart} className="container-buttons__grid-1-2__button">Start</button>
          </div>
          }
          {playing && time < 0 &&
            <button type="button" onClick={this.onClickPause} className="container-buttons__button">Pause</button>
          }

        </div>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    time: state.timerReducer.time,
    playing: state.timerReducer.playing
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
