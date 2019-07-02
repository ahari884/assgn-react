import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import DashboardPage from './components/DashboardPage';
import LoginPage from './components/login/LoginPage';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <Router history={browserHistory}>
            <Route path="/" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
