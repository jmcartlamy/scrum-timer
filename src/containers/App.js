import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import cs from 'classnames';

import Timer from '../components/Timer.js';
import * as timerActions from '../actions/timerActions.js';

class App extends Component {

  constructor() {
    super();

    this.onClickStart = this.onClickStart.bind(this);
    this.onClickPause = this.onClickPause.bind(this);
    this.onClickPlay = this.onClickPlay.bind(this);
  }

  onClickStart() {
    const { timerActions } = this.props;
    timerActions.startTimer();
  }

  onClickPlay() {
    const { timerActions } = this.props;
    timerActions.playTimer();
  }

  onClickPause() {
    const { timerActions } = this.props;
    timerActions.pauseTimer();
  }

  render() {
    const { start, paused, exceeded } = this.props;

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
        'background-green': !paused && !exceeded,
        'background-yellow': paused && !exceeded,
        'background-red': exceeded
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
              {start ? <i className="fa fa-user-plus" /> : <div>Start <i className="fa fa-clock-o" /></div> }
            </button>
          </div>
          { start &&
          <div className="container-buttons centered grid-1-2">
            {paused ?
              <button type="button" onClick={this.onClickPlay} className="container-buttons__button button-play">
                <i className="fa fa-play" />
              </button> :
              <button type="button" onClick={this.onClickPause} className="container-buttons__button button-pause">
                <i className="fa fa-pause" />
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
    startNumberSeconds: state.timerReducer.startNumberSeconds,
    start: state.timerReducer.start,
    paused: state.timerReducer.paused,
    exceeded: state.timerReducer.exceeded
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    timerActions: bindActionCreators(timerActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
