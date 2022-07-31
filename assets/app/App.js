import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
// import { Route, Switch } from 'react-router';
import axios from 'axios';

import Toolbar from './components/Navigation/ToolBar';
import Footer from './components/Footer/Footer';
import Aux from './hoc/Aux';

import Home from './containers/app/Home/Home';
import Search from './containers/app/Search/Search';
import BabysitterInfo from './containers/app/BabysitterInfo/BabysitterInfo';
import UsefulInfo from './containers/app/UsefulInfo/UsefulInfo';
import Contact from './containers/app/Contact/Contact';
import Registration from './containers/app/Registration/Registration';
import ThankYou from './containers/app/ThankYou/ThankYou';
import LoginViewProfile from './../admin/src/views/auth/LoginViewProfile';
import LoginViewAdmin from "../admin/src/views/auth/LoginViewAdmin";
// import LoginViewAdmin from './../admin/src/views/auth/LoginViewAdmin';

class App extends Component {
    state = {
        newMembers: null,
        testimonials: null
    }

    getTestimonials() {
        axios
            .get('/api/testimonials/get-testimonials')
            .then(response => {
                this.setState({testimonials: response.data});       // todo: válasz success? Többinél is!
            });
    }

    getNewMembers() {
        axios
            .get('/api/search/new-members')
            .then(response => {
                this.setState({newMembers: response.data});
            });
    }

    componentDidMount() {
        this.getTestimonials();
        this.getNewMembers();
    }

    render() {
        return (
            <Aux>
                <Toolbar/>
                <main>
                    <Switch>
                        <Route path="/" exact>
                            <Home newMembers={this.state.newMembers} testimonials={this.state.testimonials}/>
                        </Route>
                        <Route path="/bebiszittert-keresek" exact>
                            <Search/>
                        </Route>
                        <Route path="/bebiszitter-vagyok" exact>
                            <BabysitterInfo testimonials={this.state.testimonials}/>
                        </Route>
                        <Route path="/hasznos-infok" exact>
                            <UsefulInfo testimonials={this.state.testimonials}/>
                        </Route>
                        <Route path="/kapcsolat" exact>
                            <Contact/>
                        </Route>
                        <Route path="/jelentkezem-bebiszitternek" exact>
                            <Registration/>
                        </Route>
                        <Route path="/sikeres-jelentkezes" exact>
                            <ThankYou/>
                        </Route>
                        <Route path="/bejelentkezes" exact>
                            <LoginViewProfile/>
                        </Route>
                        <Route path="/admin-bejelentkezes" exact>
                            <LoginViewAdmin/>
                        </Route>
                    </Switch>
                </main>
                <Footer newMembers={this.state.newMembers}/>
            </Aux>
        );
    }
}

export default App;