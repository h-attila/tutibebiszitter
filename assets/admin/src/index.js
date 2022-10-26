import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import Admin from './Admin';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <BrowserRouter>
        <Admin/>
    </BrowserRouter>
), document.getElementById('admin'));

serviceWorker.unregister();
