import {
    Box,
    Container,
    // makeStyles
} from '@material-ui/core';
import axios from "axios";
import React, {useState, Component} from 'react';

import Spinner from '../../../../../app/components/UI/Spinner/Spinner';
import history from "../../../../../app/store/history/history";
import AuthService from "../../../AuthService";
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';



// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.dark,
//         minHeight: '100%',
//         paddingBottom: theme.spacing(3),
//         paddingTop: theme.spacing(3)
//     }
// }));

class ProfileListView extends Component {

    state = {
        'init': false,
        'loading': false,
        'status': 'all',
        'from': 0,
        'limit': 50,
        'list': []
    }

    constructor(props) {
        super(props)
        this.handleToolbarChange = this.handleToolbarChange.bind(this);
    }

    componentDidMount() {
        if (!this.state.init) {
            console.log('»» getlist');
            this.getList();
        }
    }

    getList(status) {
        this.setState({loading: true});
        const params = {
            limit: this.state.limit,
            from: this.state.from,
            status: status ?? this.state.status
        };

        console.log('»» state', this.state, params);

        // kilép, ha lejárt
        if (AuthService.isTokenExpired()) {
            history.push('/bejelentkezes');
            window.location.reload();
        }

        axios
            .post('/admin/api/profile-list/get-profile-list', params, {headers: AuthService.getAuthHeader()})
            .then(response => {
                console.log('»» getlist done', response.data);
                this.setState({list: response.data, init: true, loading: false});
            });
    }

    handleToolbarChange(status) {
        console.log('»» toolbar event', status);
        this.setState({status: status});
        this.getList(status);
    }

    render() {
        if (this.state.loading) {

            return (
                <Page title="Customers">
                    <Container maxWidth={false} style={{padding: "1rem"}}>
                        <Toolbar activeBtn={this.state.status} onToolbarChange={this.handleToolbarChange}/>
                        <Box mt={3}>
                            <Spinner/>
                        </Box>
                    </Container>
                </Page>
            )

        } else if (this.state.list.length === 0) {

            return (
                <Page title="Customers">
                    <Container maxWidth={false} style={{padding: "1rem"}}>
                        <Toolbar activeBtn={this.state.status} onToolbarChange={this.handleToolbarChange}/>
                        <Box mt={3}>
                            <p><i>Nincsen találat.</i></p>
                        </Box>
                    </Container>
                </Page>
            )
        }

        return (
            <Page title="Customers">
                <Container maxWidth={false} style={{padding: "1rem"}}>
                    <Toolbar mt={3} activeBtn={this.state.status} onToolbarChange={this.handleToolbarChange}/>
                    <Box mt={3}>
                        <Results className='fake_class' customers={this.state.list}/>
                    </Box>
                </Container>
            </Page>
        );
    }
}

export default ProfileListView;
