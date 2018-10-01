import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Onboarding from './Onboarding';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./reducers";

import logger from 'redux-logger';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Onboarding} />
        <Route path="/exercise1" component={App} />
      </div>
    </Router>
  </Provider>, document.getElementById('root'));
