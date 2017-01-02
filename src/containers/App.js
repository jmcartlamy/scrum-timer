import React, {Component} from 'react';

import ExampleComponent from '../components/ExampleComponent.js'
import logo from '../../assets/logo.svg';

class App extends Component {

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <ExampleComponent />
      </div>
    );

  }
}

export default App;
