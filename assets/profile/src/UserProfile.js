import 'react-perfect-scrollbar/dist/css/styles.css';
import {ThemeProvider} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import history from "../../app/store/history/history";
import AuthService from "./../../admin/src/AuthService";
import GlobalStyles from './../../admin/src/components/GlobalStyles';
// import './mixins/chartjs';
import theme from './../../admin/src/theme';
// import TopBar from "./../../admin/src/layouts/DashboardLayout/TopBar";
// import NavBar from "./../../admin/src/layouts/DashboardLayout/NavBar";
import Account from "./view/account/AccountView";
// import LoginViewProfile from './../../admin/src/views/auth/LoginViewProfile';



const useStyles = theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        display: 'flex',
        height: '100%',
        overflow: 'hidden',
        width: '100%'
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 0,
        // [theme.breakpoints.up('lg')]: {
        //     paddingLeft: 256
        // }
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    }
});


class UserProfile extends Component {

    state = {
        isMobileNavOpen: false
    }

    render() {
        const {classes} = this.props;

        const currentUser = AuthService.getCurrentUser();

        if (!currentUser || !currentUser.token) {

            AuthService.logout();

            history.push('/bejelentkezes');
            window.location.reload();

            return null;
        }

        return (
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles/>
                    <div className={classes.wrapper}>
                        <div className={classes.contentContainer}>
                            <div className={classes.content}>
                                <Switch>

                                    <Route path="/profilom/:uuid" exact>
                                        <Account />
                                    </Route>

                                </Switch>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}

export default withStyles(useStyles)(UserProfile)

