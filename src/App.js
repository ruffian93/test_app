import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './routes/main';
import ErrorPage from './routes/error';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Main} />
        <Route component={ErrorPage} />
      </Switch>
    )
  }
}

export default App
