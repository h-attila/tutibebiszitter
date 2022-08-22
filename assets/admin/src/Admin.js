import 'react-perfect-scrollbar/dist/css/styles.css';
import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {Route, Switch} from 'react-router-dom';
import {ThemeProvider} from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles';
import './mixins/chartjs';
import theme from './theme';
import TopBar from "./layouts/DashboardLayout/TopBar";
import NavBar from "./layouts/DashboardLayout/NavBar";
import DashboardView from "./views/reports/DashboardView";
import ProfileListView from "./views/list/ProfileListView"; // todo: ezek nagyon hasonlóak, átírni class-ra, és egybe venni őket, csak paraméterben térnek el.
import TestimonialsListView from "./views/list/TestimonialsListView";
import PlaceListView from "./views/list/PlaceListView";
import ListView from "./views/list/ListView/ListView";
import ListViewPayMode from "./views/list/ListView/ListViewPayMode";
import ListViewPackages from "./views/list/ListView/ListViewPackages";
import ListViewGroups from "./views/list/ListView/ListViewGroups";
import ListViewTestimonials from "./views/list/ListView/ListViewTestimonials";
import Account from "./views/account/AccountView";
import AuthService from "./AuthService";
import history from "../../app/store/history/history";
import App from "../../app/App";
import LoginViewProfile from './../../admin/src/views/auth/LoginViewProfile';



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
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 256
        }
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


class Admin extends Component {

    state = {
        isMobileNavOpen: false
    }

    render() {
        const {classes} = this.props;

        const currentUser = AuthService.getCurrentUser();

        if (!currentUser || !currentUser.profile.isAdmin || !currentUser.token) {

            AuthService.logout();

            history.push('/bejelentkezes');
            window.location.reload();

            return null;
        }

        return (
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <GlobalStyles/>
                    {/*<TopBar onMobileNavOpen={() => setMobileNavOpen(true)}/>*/}
                    <TopBar onMobileNavOpen={() => {
                    }}/>
                    <NavBar
                        onMobileClose={() => {
                        }}
                        // onMobileClose={() => setMobileNavOpen(false)}
                        openMobile={this.state.isMobileNavOpen}
                    />
                    <div className={classes.wrapper}>
                        <div className={classes.contentContainer}>
                            <div className={classes.content}>
                                <Switch>

                                    <Route path="/admin/dashboard" exact>
                                        <DashboardView/>
                                    </Route>

                                    <Route path="/admin/profil/:uuid" exact>
                                        <Account/>
                                    </Route>

                                    <Route path="/admin/tagok" exact>
                                        <ProfileListView/>
                                    </Route>

                                    <Route path="/admin/szolgaltatasok" exact>
                                        <ListView key="service" name="service" title="Szolgáltatások"/>
                                    </Route>

                                    <Route path="/admin/kiegeszito-szolgaltatasok" exact>
                                        <ListView key="additional-service" name="additional-service" title="Kiegészítő szolgáltatások"/>
                                    </Route>

                                    <Route path="/admin/dijcsomagok" exact>
                                        <ListViewPackages key="package" name="package" title="Díjcsomagok"/>
                                    </Route>

                                    <Route path="/admin/fizetesi-modok" exact>
                                        <ListViewPayMode key="paymode" name="paymode" title="Fizetési módokkk"/>
                                    </Route>

                                    <Route path="/admin/nyelvek" exact>
                                        <ListView key="language" name="language" title="Nyelvek"/>
                                    </Route>

                                    <Route path="/admin/csoportok" exact>
                                        <ListViewGroups key="group" name="group" title="Csoportok"/>
                                    </Route>

                                    <Route path="/admin/velemenyek" exact>
                                        <ListViewTestimonials key="testimonials" name="testimonials" title="Vélemények"/>
                                    </Route>

                                    <Route path="/admin/telepulesek" exact>
                                        <PlaceListView/>
                                    </Route>

                                    {/*<Route path="/admin/logout" exact>*/}
                                    {/*    <Route path="/" component={withRouter(App)}/>*/}
                                    {/*</Route>*/}

                                    {/*<Route path="/bejelentkezes" component={App} />*/}

                                </Switch>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </div>
        );
    }
}

export default withStyles(useStyles)(Admin)

