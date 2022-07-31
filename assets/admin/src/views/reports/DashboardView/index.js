import React, {useEffect, useState} from 'react';
import {
    Container,
    Grid,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import NewMembers from './NewMembers';
import StatisticsByHistory from './StatisticsByHistory';
import NearExpire from './NearExpire';
import ActiveMembers from './ActiveMembers';
import Modified from './Modified';
import StatisticsByUserStatus from './StatisticsByUserStatus';
import axios from 'axios';
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

const Dashboard = () => {
    const [userStatistics, setUserStatistics] = useState({
        new: 0,
        active: 0,
        inactive: 0,
        nearExpire: 0,
        expired: 0,
        modified: 0
    });

    const [historyStatistics, setHistoryStatistics] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0
    });

    const classes = useStyles();

    useEffect(() => {
        // kilép, ha lejárt
        if (AuthService.isTokenExpired()) {
            history.push('/bejelentkezes');
            window.location.reload();
        }

        axios
            .get('/admin/api/statistics/get-by-user-status', {headers: AuthService.getAuthHeader()})
            .then(response => {
                setUserStatistics(response.data);
            });

        axios
            .get('/admin/api/statistics/get-by-user-history', {headers: AuthService.getAuthHeader()})
            .then(response => {
                setHistoryStatistics(response.data);
            });
    }, []);

    // getTestimonials() {
    //   axios
    //     .get('/api/testimonials/get-testimonials')
    //     .then(response => {
    //       this.setState({testimonials: response.data});
    //     });
    // }


    return (
        <Page
            className={classes.root}
            title="Dashboard"
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <NewMembers userStatistics={userStatistics.new}/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <ActiveMembers userStatistics={userStatistics.active}/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <NearExpire userStatistics={userStatistics.nearExpire}/>
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                        <Modified userStatistics={userStatistics.modified}/>
                    </Grid>
                    <Grid
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <StatisticsByHistory historyStatistics={historyStatistics}/>
                    </Grid>
                    <Grid
                        item
                        lg={4}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <StatisticsByUserStatus userStatistics={userStatistics}/>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
};

export default Dashboard;
