import React, {Component} from 'react';
import Img1 from "../../../images/babysitter_bg_1.jpg";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import {FormControl} from '@mui/material';

import classes from './Contact.scss';
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@material-ui/core/Button";
import Recaptcha from 'react-google-invisible-recaptcha';
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import axios from "axios";

class Contact extends Component {

    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.onResolved = this.onResolved.bind(this);

    }

    state = {
        name: '',
        phone: '',
        email: '',
        message: '',
        token: null,
        sending: false,
        error: false,
        buttonText: 'Üzenetet küldök',
        captchaResponse: null
    }

    messageFieldChanged(event, field) {
        this.setState({
            message: {
                ...this.state.message,
                [field]: event.target.value
            }
        });
    }

    sendMessage() {
        this.recaptcha.execute();
    }

    onResolved() {
        this.setState({
            message: {
                ...this.state.message,
                sending: true,
                error: false
            }
        });

        let message = {
            name: this.state.message.name,
            email: this.state.message.email,
            message: this.state.message.message,
            token: this.recaptcha.getResponse(),
            uuid: this.state.message.uuid
        };

        let MySwal = withReactContent(Swal);

        axios
            .post('/api/message/send-contact-message', message)
            .then(
                response => {
                    if (response.status === 200) {
                        this.setState({
                            message: {
                                ...this.state.message,
                                name: '',
                                phone: '',
                                email: '',
                                message: '',
                                sending: false,
                                token: null
                            }
                        });
                        MySwal.fire({
                            icon: 'success',
                            text: 'Üzenet sikeresen elküldve',
                        })
                    } else {
                        this.setState({
                            message: {
                                ...this.state.message,
                                sending: false,
                                token: null
                            }
                        });

                        MySwal.fire({
                            icon: 'error',
                            text: response.error ?? 'Hiba történt, az üzenet elküldése sikertelen',
                        })
                    }
                }
            ).catch(err => {
            MySwal.fire({
                icon: 'error',
                text: 'Hiba történt, az üzenet elküldése sikertelen',
            })
        });
    }

    render() {
        return (
            <div className={["contact-page", classes.Contact].join(' ')}>
                <div className="container">

                    <div className="row">
                        <div className="col">
                            <h1 className="text-center mb-3">Kapcsolat</h1>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col m-1">
                            <div className={[classes.Img].join(' ')}
                                 style={{backgroundImage: "url(" + Img1 + ")"}}></div>
                        </div>
                        <div className="col">
                            <Paper elevation={3} bgcolor="#f7f7f7">
                                <Box p={3} mb={3}>
                                    <h5>Írj nekünk</h5>
                                    <hr/>
                                    <FormControl className="w-100">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    className="w-100 m-1 p-1 "
                                                    id="name"
                                                    label='Neved'
                                                    placeholder='Így fogunk szólítani'
                                                    size="small"
                                                    value={this.state.message.name}
                                                    onChange={(event) => this.messageFieldChanged(event, 'name')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    className="w-100 m-1 p-1"
                                                    id="message_email"
                                                    label='E-mail címed'
                                                    placeholder='Ide kapod meg a válaszunkat'
                                                    size="small"
                                                    value={this.state.message.email}
                                                    onChange={(event) => this.messageFieldChanged(event, 'email')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    className="w-100 m-1 p-1 "
                                                    id="message_email"
                                                    label='Telefonszámod'
                                                    placeholder='Itt tudunk visszahívni'
                                                    size="small"
                                                    value={this.state.message.phone}
                                                    onChange={(event) => this.messageFieldChanged(event, 'email')}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    className="w-100 m-1 p-1"
                                                    id="message_message"
                                                    multiline
                                                    rows={7}
                                                    label='Írd ide az üzeneted'
                                                    size="small"
                                                    value={this.state.message.message}
                                                    onChange={(event) => this.messageFieldChanged(event, 'message')}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    variant="outlined"
                                                    className={[classes.Button, 'w-100 m-1'].join(' ')}
                                                    onClick={this.sendMessage}
                                                >
                                                    {this.state.message.buttonText}
                                                </Button>
                                                </Grid>

                                            <div>
                                                <Recaptcha
                                                    ref={ref => this.recaptcha = ref}
                                                    sitekey="6LfJWhEiAAAAALIr3BJ2D440K-c7n5MyGYE-vWkw"
                                                    onResolved={this.onResolved}
                                                />
                                            </div>
                                        </Grid>
                                    </FormControl>
                                </Box>
                                <Box p={3} mb={3}>
                                    <h6>Vagy csörgess meg telefonon</h6>
                                    <hr/>
                                    06 70 251 0077
                                </Box>
                            </Paper>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Contact;