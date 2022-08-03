import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import PropTypes from "prop-types";
import NavBar from "../../../layouts/DashboardLayout/NavBar";
import axios from "axios";
import AuthService from "../../../AuthService";
import history from "../../../../../app/store/history/history";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

const ListView = ({type, title}) => {
    const classes = useStyles();
    const [data, setData] = useState(
        []
    );

    useEffect(() => {
        // kilép, ha lejárt
        if (AuthService.isTokenExpired()) {
            history.push('/bejelentkezes');
            window.location.reload();
        }

        axios
            .get('/admin/api/' + type + '/get-' + type + '-list', {headers: AuthService.getAuthHeader()})
            .then(response => {
                console.log('»» init', response.data);
                setData(response.data);
            });
    }, []);

    console.log('»» listType', type, data)

    return (
        <Page
            className={classes.root}
            title={title}
        >
            <Container maxWidth={false}>
                <Toolbar/>
                <Box mt={3}>
                    <Results data={data}/>
                </Box>
            </Container>
        </Page>
    );
};

ListView.propTypes = {
    type: PropTypes.string,
    title: PropTypes.string
};

export default ListView;