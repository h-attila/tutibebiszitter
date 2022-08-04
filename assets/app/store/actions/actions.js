import * as actionTypes from './actionTypes';
import axios from 'axios';

import history from "../history/history";
import {SEARCH_FORM_PAGE_CHANGE} from "./actionTypes";

// *************
// Search Form
// *************
export const searchFormInit = () => {
    console.log('SEARCH_FORM_INIT');
    return dispatch => axios
        .get('/api/search/search-init')
        .then(
            data => dispatch({type: 'SEARCH_FORM_INIT', data}),
            err => dispatch({type: 'SHOW_ERROR_MESSAGE', err})
        );
}

export const searchFormSubmit = (event) => {
    console.log('»» searchFormSubmit');
    const pagination = event ? event.selected : 0;
    return (dispatch, getState) => {
        const data = {
            searchParams: getState().search.searchParams,
            pagination: pagination
        }

        dispatch({type: 'SEARCH_FORM_SEARCHING'});
        axios
            .post('/api/search/search-profiles', data)
            .then(
                result => dispatch({type: 'SEARCH_FORM_SUBMIT', result})
            )
            .then(
                event => dispatch({type: 'SEARCH_FORM_PAGE_CHANGE', event})
            )
            .then(
                () => history.push('/bebiszittert-keresek')
            )
            .catch(err => {
                dispatch({type: 'SHOW_ERROR_MESSAGE', err});       // todo: tesztelni!
            });
    }
}

export const searchFormPageChange = (event) => {
    return {
        type: actionTypes.SEARCH_FORM_PAGE_CHANGE,
        event: event,
    }
}

export const searchItemChanged = (item, value) => {
    return {
        type: actionTypes.SEARCH_ITEM_CHANGED,
        item: item,
        value: value
    }
}

// *************
// REGISTRATION
// *************
export const packagesInit = () => {
    return (dispatch) => {
        axios
            .get('/api/packages/packages-init')
            .then(
                result => dispatch({type: 'PACKAGES_INIT', result})
            )
            .catch(err => {
                dispatch({type: 'SHOW_ERROR_MESSAGE', err});       // todo: tesztelni!
            });
    }
}

export const registrationFormSubmit = (formData) => {
    console.log('»» regForm submit', formData);
    return (dispatch) => {
        dispatch({type: 'REGISTRATION_FORM_SUBMITTING'})
        axios
            .post('/api/registration/register', formData)
            .then(result => dispatch({type: 'REGISTRATION_FORM_SUCCESS', result}))
            .catch(err => {
                console.log('»» err', err.response.data);
                if (err.response.data.errors) {
                    dispatch({type: 'REGISTRATION_FORM_FAILED', err});       // todo: tesztelni!
                } else {
                    dispatch({type: 'SHOW_ERROR_MESSAGE', err});
                }
            });
    }
}

export const registrationFormReset = () => {
    return (dispatch) => {
        dispatch({type: 'REGISTRATION_FORM_RESET'})
    }
}

// *************
// Button
// *************
export const buttonClick = (ref) => {
    return () => history.push('/' + ref);
}


// *************
// USER
// *************
// login
export const profileLoginFormSubmit = () => {
    return (dispatch, getState) => {
        console.log('»» login data', getState(), {username: getState().user.username, password: getState().user.password});
        dispatch({type: 'PROFILE_LOGIN'})
        const headers = {
            'Content-Type': 'application/json',
        }
        axios
            .post('/api/login_check',
                {username: getState().user.username, password: getState().user.password},
                {headers: headers})
            .then(
                result => dispatch({type: 'PROFILE_LOGIN_SUCCESS', result})
                // result => console.log('»» login res', result)
            )
            .then(
                (result) => {
                    history.push(result.result.data.profile.path);
                    window.location.reload();
                }
            )
            .catch(err => {
                dispatch({type: 'PROFILE_LOGIN_FAILED', err});       // todo: tesztelni!
            });
    }
}

// login - adatbevitel
export const profileLoginFormChange = (event, target) => {
    console.log('»» loginFormChange', event, target);
    event.preventDefault();
    return {
        type: actionTypes.PROFILE_LOGIN_CHANGED,
        value: event.target.value,
        target: target
    }
}

/**
 * ADMIN belépés
 */
// admin login
export const adminLoginFormSubmit = () => {
    return (dispatch, getState) => {
        console.log('»» admin login data', getState(), {email: getState().user.email, password: getState().user.password});
        dispatch({type: 'ADMIN_LOGIN'})
        const headers = {
            'Content-Type': 'application/json',
        }
        axios
            .post('/api/login_admin',
                {username: getState().user.email, password: getState().user.password},
                {headers: headers})
            .then(result => dispatch({type: 'ADMIN_LOGIN_SUCCESS', result}))
            .then(() => history.push('/admin/dashboard'))
            .catch(err => {
                dispatch({type: 'ADMIN_LOGIN_FAILED', err});       // todo: tesztelni!
            });
    }
}

// login - adatbevitel
export const adminLoginFormChange = (event, target) => {
    console.log('»» admin loginFormChange', event, target);
    event.preventDefault();
    return {
        type: actionTypes.ADMIN_LOGIN_CHANGED,
        value: event.target.value,
        target: target
    }
}

// üzenet küldés
export const message = (message) => {
    return {
        type: actionTypes.MESSAGE,
        message: message
    }
}