import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import React, {Component} from 'react';
import Loadable from 'react-loadable';

import Spinner from '../../../components/UI/Spinner/Spinner';


const RegistrationForm = Loadable({
    loader: () => import('../../../components/RegistrationForm/RegistrationForm'),
    loading: Spinner,
});

class Registration extends Component {
    render() {
        return (
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box mt={5}>
                            <h1 className="text-center mt-5 mb-3" align="center">Jelentkezem bébiszitternek - TUTI bébiszitter-közvetítő</h1>
                        </Box>
                        <Box mt={1}>
                            <h3 align="center">Regisztrálj, és legyél Te is tuti bébiszitter!</h3>
                        </Box>
                        <Box my={3}>
                            <Alert severity="info">Hogy több megkeresésed legyen, javasoljuk, hogy jelentkezés előtt olvasd át a
                                <a
                                    className="ml-2 mr-2"
                                    href="/hasznos-infok"
                                    target="_blank">
                                    "A sikeres hirdetés 7 titka a www.tutibebiszitter.hu oldalon"
                                </a>
                                című ismertetőnket.
                            </Alert>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12}>

                        <RegistrationForm/>

                    </Grid>
                </Grid>

            </Container>
        );
    }
}

export default Registration;