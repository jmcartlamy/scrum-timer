import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cs from 'classnames';

import Timer from '../components/Timer.js';
import * as timerActions from '../actions/timerActions.js';
import * as allottedTimeActions from '../actions/allottedTimeActions.js';

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
    const { timerActions, allottedTimeActions, exceed } = this.props;
    timerActions.startTimer();
    if (exceed) {
      allottedTimeActions.resetTime();
    }
    this.tick();
  }

  onClickPlay() {
    const { timerActions } = this.props;
    timerActions.playTimer();
    this.tick();
  }

  onClickPause() {
    const { timerActions } = this.props;
    timerActions.pauseTimer();
    clearInterval(this.updateComponent);
  }

  render() {
    const { start, paused, exceed } = this.props;

    const startCSSClassnames = cs(
      'container-buttons centered',
      {
        'grid-1-1': !start,
        'grid-1-2': start
      }
    );

    const scrumAppCSSClassnames = cs(
      'scrum-app',
      {
        'background-green': !paused && !exceed,
        'background-yellow': paused && !exceed,
        'background-red': exceed
      }
    );

    return (
      <div className={scrumAppCSSClassnames}>
        <div className="wrapper-timer centered">
          <Timer {...this.props} />
        </div>
        <div className="wrapper-buttons">

          <div className={startCSSClassnames}>
            <button type="button" onClick={this.onClickStart} className="container-buttons__button button-start">
              {start ? 'Next' : 'Start'}
            </button>
          </div>
          { start &&
          <div className="container-buttons centered grid-1-2">
            {paused ?
              <button type="button" onClick={this.onClickPlay} className="container-buttons__button button-play">
                Play
              </button> :
              <button type="button" onClick={this.onClickPause} className="container-buttons__button button-pause">
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
    paused: state.timerReducer.paused,
    exceed: state.allottedTimeReducer.exceed
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    timerActions: bindActionCreators(timerActions, dispatch),
    allottedTimeActions: bindActionCreators(allottedTimeActions, dispatch)
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
