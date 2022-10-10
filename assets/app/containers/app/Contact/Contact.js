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
        captchaResponse: null
    }

    messageFieldChanged(event, field) {
        this.setState({
            ...this.state,
            [field]: event.target.value
        });
    }

    sendMessage() {
        this.recaptcha.execute();
    }

    onResolved() {
        this.setState({
            ...this.state,
            sending: true,
        });

        let message = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            message: this.state.message,
            token: this.recaptcha.getResponse(),
        };

        let MySwal = withReactContent(Swal);

        axios
            .post('/api/message/send-contact-message', message)
            .then(
                response => {
                    if (response.status === 201) {
                        this.setState({
                            ...this.state,
                            name: '',
                            phone: '',
                            email: '',
                            message: ''
                        });
                        MySwal.fire({
                            icon: 'success',
                            text: 'Üzenet sikeresen elküldve',
                        })
                    } else {
                        MySwal.fire({
                            icon: 'error',
                            text: response.data.error.join(', ') ?? 'Hiba történt, az üzenet elküldése sikertelen',
                        })
                    }
                }
            )
            .catch(err => {
                MySwal.fire({
                    icon: 'error',
                    text: 'Hiba történt, az üzenet elküldése sikertelen',
                })
            })
            .finally(() => {
                this.recaptcha.reset();
                this.setState({
                    ...this.state,
                    sending: false,
                    token: null
                });
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
                            <Paper elevation={3} className={classes.FormWrapper}>
                                <Box p={2}>
                                    <h5>csörgess meg telefonon</h5>
                                    <hr/>
                                    <h4 className="text-center">06 70 251 0077</h4>
                                </Box>
                                <Box p={2}>
                                    <h5>vagy írj nekünk</h5>
                                    <hr/>
                                    <FormControl className="w-100">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    className="w-100 m-1"
                                                    id="name"
                                                    label='Neved'
                                                    placeholder='Így fogunk szólítani'
                                                    size="small"
                                                    value={this.state.name}
                                                    onChange={(event) => this.messageFieldChanged(event, 'name')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    className="w-100 m-1"
                                                    id="message_email"
                                                    label='E-mail címed'
                                                    placeholder='Ide kapod meg a válaszunkat'
                                                    size="small"
                                                    value={this.state.email}
                                                    onChange={(event) => this.messageFieldChanged(event, 'email')}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    className="w-100 m-1"
                                                    id="message_phone"
                                                    label='Telefonszámod'
                                                    placeholder='Itt tudunk visszahívni'
                                                    size="small"
                                                    value={this.state.phone}
                                                    onChange={(event) => this.messageFieldChanged(event, 'phone')}
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    className="w-100 m-1"
                                                    id="message_message"
                                                    multiline
                                                    rows={5}
                                                    label='Írd ide az üzeneted'
                                                    size="small"
                                                    value={this.state.message}
                                                    onChange={(event) => this.messageFieldChanged(event, 'message')}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    variant="outlined"
                                                    className={[classes.Button, 'w-100'].join(' ')}
                                                    onClick={this.sendMessage}
                                                    disabled={this.state.sending}
                                                >
                                                    üzenetet küldök
                                                </Button>
                                            </Grid>

                                            <div>
                                                <Recaptcha
                                                    ref={ref => this.recaptcha = ref}
                                                    sitekey='6LfJWhEiAAAAALIr3BJ2D440K-c7n5MyGYE-vWkw'
                                                    onResolved={this.onResolved}
                                                />
                                            </div>
                                        </Grid>
                                    </FormControl>
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