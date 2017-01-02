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

  onTimeChangeHandler() {

  }

  onClickReset() {
    const { actions } = this.props;
    actions.resetTimer();
  }

  onClickPause() {
    clearTimeout(this.playingTime);
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
    const { timer } = this.props;

    return (
      <div className="Scrum-App">
        <input type="text" value={timer.time} readOnly={this.onTimeChangeHandler} />
        <button type="button" onClick={this.onClickReset}>Reset</button>
        {timer.playing && <button type="button" onClick={this.onClickPause}>Pause</button>}
        {!timer.playing && <button type="button" onClick={this.onClickStart}>Start</button>}
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    timer: state.timerReducer
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
