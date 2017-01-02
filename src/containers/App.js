import React, {Component} from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as timerActions from '../actions/timerActions.js';

class App extends Component {

  onTimeChangeHandler() {

  }


  render() {
    const { timer } = this.props;

    return (
      <div className="Scrum-App">
        <input type="text" value={timer} onChange={this.onTimeChangeHandler} />
        <button type="button" value="">Reset</button>
        <button type="button" value="">Pause</button>
        <button type="button" value="">Start</button>
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
