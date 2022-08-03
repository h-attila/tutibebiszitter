// import { useRouter } from 'next/router';
import React, {Component} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';
import * as actionCreators from "../../../../app/store/actions/actions";
import {connect} from "react-redux";

import classes from './LoginViewCommon.scss';
import Alert from "@material-ui/lab/Alert";

class LoginViewProfile extends Component {

    render() {
        let alert = null;
        if (this.props.error) {
            alert = <Alert severity="warning" style={{width: '100%'}}>{this.props.error}</Alert>;
        }

        return (
            <>
                <Box
                    component="main"
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexGrow: 1,
                        minHeight: '100%'
                    }}
                >
                    <Container maxWidth="sm">
                        <form>
                            <Box sx={{my: 4}}>
                                <Typography
                                    align="center"
                                    color="textPrimary"
                                    variant="h4"
                                >
                                    Bejelentkezés
                                </Typography>
                            </Box>
                            <Box sx={{my: 1}}>
                                <Typography
                                    align="center"
                                    color="textSecondary"
                                    gutterBottom
                                    variant="body1"
                                >
                                    Saját adatok szerkesztése és tagság áttekintése
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    pb: 1,
                                    pt: 3
                                }}
                            >
                                <Typography
                                    align="center"
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Bejelentkezéshez add meg a regisztrált email címed és jelszavad
                                </Typography>
                            </Box>
                            <TextField
                                // error={this.props.error ?? ''}
                                fullWidth
                                label="E-mail cím"
                                margin="normal"
                                name="username"
                                type="email"
                                value={this.props.username}
                                onChange={(event) => this.props.onProfileLoginFormChange(event, 'username')}
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Jelszó"
                                margin="normal"
                                name="password"
                                type="password"
                                value={this.props.password}
                                onChange={(event) => this.props.onProfileLoginFormChange(event, 'password')}
                                variant="outlined"
                            />
                            <Box sx={{py: 2}}>
                                <Button
                                    color="primary"
                                    disabled={this.props.loading}
                                    className={classes.Button}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={() => this.props.onProfileLoginFormSubmit()}
                                >
                                    Belépés
                                </Button>
                            </Box>

                            { alert }

                            <Box sx={{py: 2}}>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Még nincs fiókod? {' '} <a href="/jelentkezem-bebiszitternek">Hozz létre
                                    egyet</a>
                                </Typography>
                            </Box>
                            <Box sx={{py: 2}}>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                >
                                    Elfelejtetted a jelszavad? {' '} <a href="#">Kattints ide</a>
                                </Typography>
                            </Box>
                        </form>
                    </Container>
                </Box>
            </>
        );
    };
}

const mapStateToProps = state => {

        return {
            loading: state.user.loading,
            username: state.user.username,
            password: state.user.password,
            error: state.user.error
        }
    }
;

const mapDispatchToProps = dispatch => {
    return {
        onProfileLoginFormChange: (event, target) => dispatch(actionCreators.profileLoginFormChange(event, target)),
        onProfileLoginFormSubmit: () => dispatch(actionCreators.profileLoginFormSubmit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginViewProfile);