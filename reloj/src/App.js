import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RelojContainer from './containers/RelojContainer';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={RelojContainer} />
        </div>
      </Router>
      
    );
  }
}

export default App;
