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
      <div className="Scrum-App">
        <h1>{time >= 0 ? time : 0}</h1>
        <button type="button" onClick={this.onClickReset}>Reset</button>
        {playing && time > 0 && <button type="button" onClick={this.onClickPause}>Pause</button>}
        {!playing && time > 0 && <button type="button" onClick={this.onClickStart}>Start</button>}
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
