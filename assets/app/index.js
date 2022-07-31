/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
import React from 'react';
import ReactDOM from 'react-dom';
import history from './store/history/history';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import reducer from './store/reducer/reducer';
import thunk from 'redux-thunk';
import {Router} from "react-router-dom";
// import { ConnectedRouter } from 'connected-react-router';
import './styles/app.scss';

import App from './App';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {/*<ConnectedRouter history={history}>*/}
            <App/>
            {/*</ConnectedRouter>*/}
        </Router>
    </Provider>
    , document.getElementById('app'));