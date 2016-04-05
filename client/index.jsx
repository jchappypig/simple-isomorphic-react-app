import React       from 'react';
import { render }  from 'react-dom';
import { Router }  from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes      from 'routes';
const history = createBrowserHistory();
import { createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import * as reducers                    from 'reducers';
import { fromJS }                       from 'immutable';

let initialState = window.__INITIAL_STATE__;
// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });
const reducer = combineReducers(reducers);
const store   = createStore(reducer, initialState);


render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);