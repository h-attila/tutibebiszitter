import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './../../admin/src/serviceWorker';
import UserProfile from './UserProfile';

ReactDOM.render((
    <BrowserRouter>
        <UserProfile />
    </BrowserRouter>
), document.getElementById('user_profile'));

serviceWorker.unregister();
