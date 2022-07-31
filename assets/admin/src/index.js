import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Admin from './Admin';

ReactDOM.render((
    <BrowserRouter>
        <Admin/>
    </BrowserRouter>
), document.getElementById('admin'));

serviceWorker.unregister();
