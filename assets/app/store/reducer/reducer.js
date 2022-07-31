import * as actionTypes from '../actions/actionTypes';
import AuthService from '../../../admin/src/AuthService';

const initialState = {
        search: {
            init: false,
            searching: false,
            searchParams: {
                service: null,
                place: null,
                group: null,
                language: null,
                handicap: null
            },
            options: {
                service: [],
                place: [],
                group: [],
                language: [],
                handicap: []
            },
            pagination: {
                nbResults: null,
                nbPages: null,
                haveToPaginate: false,
                hasPreviousPage: false,
                hasNextPage: false,
                currentPage: 1,
            },
            result: null
        },
        registration: {
            formErrors: [],
            submitDisabled: false,
            successRegistration: false
        },
        user: {
            username: '',
            password: '',
            avatar: null,
            isAdmin: false,
            token: null,
            loading: false,
            error: null
        },
        testimonials: null,
        packages: null
    }
;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_FORM_INIT: {
            console.log('### SEARCH_FORM_INIT', action, state);
            return {
                ...state,
                search: {
                    ...state.search,
                    init: true,
                    options: {
                        ...state.search.options,
                        ...action.data.data
                    }
                }
            }
        }
        case actionTypes.SEARCH_ITEM_CHANGED: {
            console.log('»» action', action);
            let value = null;
            if (action.value) {
                action.value.value = action.value ? action.value.id : null;
                value = action.value;
            }
            const item = action.item;
            return {
                ...state,
                search: {
                    ...state.search,
                    searchParams: {
                        ...state.search.searchParams,
                        [item]: value
                    }
                }
            }
        }
        case actionTypes.SEARCH_FORM_SEARCHING: {
            console.log('### SEARCH_FORM_SEARCHING', action, state);
            return {
                ...state,
                search: {
                    ...state.search,
                    result: [],
                    searching: true
                }
            }

        }
        case actionTypes.SEARCH_FORM_SUBMIT: {
            return {
                ...state,
                search: {
                    ...state.search,
                    searching: false,
                    result: [
                        ...action.result.data.result
                    ],
                    pagination: {
                        ...state.search.pagination,
                        ...action.result.data.pagination
                    }
                }
            }
        }
        case actionTypes.SEARCH_FORM_PAGE_CHANGE: {
            const currentPage = action.event.selected ?? 0;
            return {
                ...state,
                search: {
                    ...state.search,
                    pagination: {
                        ...state.search.pagination,
                        currentPage: currentPage + 1
                    }
                }
            }
        }
        case actionTypes.PACKAGES_INIT: {
            return {
                ...state,
                packages: [
                    ...action.result.data
                ]
            }
        }
        case actionTypes.REGISTRATION_FORM_SUBMITTING: {
            return {
                ...state,
                registration: {
                    ...state.registration,
                    formErrors: [],
                    submitDisabled: true
                }
            }
        }
        case actionTypes.REGISTRATION_FORM_SUCCESS: {
            console.log('»» REGISTRATION_FORM_SUCCESS', action, state);

            return {
                ...state,
                registration: {
                    ...state.registration,
                    formErrors: [],
                    submitDisabled: false,
                    successRegistration: true
                }
            }
        }
        case actionTypes.REGISTRATION_FORM_FAILED: {

            let res;
            if (action.err.response.data.errors) {
                return {
                    ...state,
                    registration: {
                        ...state.registration,
                        formErrors: action.err.response.data.errors,
                        submitDisabled: false,
                        successRegistration: false
                    }
                }
            }
            return res;
        }
        case actionTypes.REGISTRATION_FORM_RESET: {
            return {
                ...state,
                registration: {
                    ...state.registration,
                    formErrors: [],
                    submitDisabled: false,
                    successRegistration: false
                }
            };
        }
        case actionTypes.MESSAGE: {
            return state;
        }
        case actionTypes.PROFILE_LOGIN:
            // case actionTypes.ADMIN_LOGIN:
        {
            console.log('»» PROFILE_LOGIN');
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: true
                }
            }
        }
        case actionTypes.PROFILE_LOGIN_SUCCESS: {
            // case actionTypes.ADMIN_LOGIN_SUCCESS: {
            console.log('»» PROFILE_LOGIN_SUCCESS', action.result.data.token, action.result.data.profile.isAdmin);
            if (!action.result.data.token) {
                return;
            }

            AuthService.login(action.result.data);

            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    // name: action.result.data.profile.name,
                    // avatar: action.result.data.profile.avatar,
                    token: action.result.data.token,
                    isAdmin: action.result.data.profile.isAdmin,
                    // url: action.result.data.profile.url,
                    error: null
                }
            }
        }
        case actionTypes.PROFILE_LOGOUT: {
            AuthService.logout();

            return;
        }
        case actionTypes.GET_PROFILE: {
            return AuthService.getCurrentUser();
        }
        case actionTypes.PROFILE_LOGIN_CHANGED:
            // case actionTypes.ADMIN_LOGIN_CHANGED:
        {
            console.log('»» reducer action', action);
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.target]: action.value,
                }
            }
        }
        case actionTypes.PROFILE_LOGIN_FAILED:
            // case actionTypes.ADMIN_LOGIN_FAILED:
        {
            return {
                ...state,
                user: {
                    ...state.user,
                    loading: false,
                    name: null,
                    avatar: null,
                    role: null,
                    token: null,
                    error: ''
                }
            }
        }
        case actionTypes.SHOW_ERROR_MESSAGE: {
            console.log('»» hiba történt, hiba modal nyitás');
            return {
                ...state,
                registration: {
                    ...state.registration,
                    submitDisabled: false
                }
            }
        }
    }

    return state;
}

export default reducer;