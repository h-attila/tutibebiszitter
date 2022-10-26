import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from "axios";
import React, {useEffect, useState} from 'react';

import history from "../../../../../app/store/history/history";
import AuthService from "../../../AuthService";
import Page from '../../../components/Page';
import Results from './Results';
import Toolbar from './Toolbar';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ServiceListView = () => {
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
      .get('/admin/api/service/get-service-list', {headers: AuthService.getAuthHeader()})
      .then(response => {
        console.log('»» init', response.data);
        setData(response.data);
      });
  }, []);

  return (
    <Page
      className={classes.root}
      title="Szolgáltatások"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results data={data} />
        </Box>
      </Container>
    </Page>
  );
};

export default ServiceListView;
