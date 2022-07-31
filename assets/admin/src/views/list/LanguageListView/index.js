import React, {useEffect, useState} from 'react';
import {
    Box,
    Container,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
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

const LanguageListView = () => {
    const classes = useStyles();
    const [data, setData] = useState(
        []
    );

    // kilép, ha lejárt
    if (AuthService.isTokenExpired()) {
        history.push('/bejelentkezes');
        window.location.reload();
    }

    useEffect(() => {
        axios
            .get('/admin/api/language/get-language-list', {headers: AuthService.getAuthHeader()})
            .then(response => {
                console.log('»» init', response.data);
                setData(response.data);
            });
    }, []);

    return (
        <Page
            className={classes.root}
            title="Nyelvek"
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

export default LanguageListView;
