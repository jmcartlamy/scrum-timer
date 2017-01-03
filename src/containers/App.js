import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cs from 'classnames';

import Timer from '../components/Timer.js';
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

  render() {
    const { start, paused } = this.props;

    const startCSSClassnames = cs(
      {
        'container-buttons__grid-1-1': !start,
        'container-buttons__grid-1-2': start
      }
    );

    return (
      <div className="scrum-app">
        <div className="container-timer centered">
          <Timer {...this.props} />
        </div>
        <div className="container-buttons">

          <div className={startCSSClassnames}>
            <button type="button" onClick={this.onClickStart} className="container-buttons__grid-1-2__button">
              {start ? 'Next' : 'Start'}
            </button>
          </div>
          { start &&
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
          }

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
