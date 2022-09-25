import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FacebookIcon from '@mui/icons-material/Facebook';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import MapIcon from '@mui/icons-material/Map';
import SavingsIcon from '@mui/icons-material/Savings';
import SchoolIcon from '@mui/icons-material/School';
import Badge from "@mui/material/Badge";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import React, {Component} from 'react';
import Spinner from '../../../../app/components/UI/Spinner/Spinner';
import Recaptcha from 'react-google-invisible-recaptcha';
import { FormControl } from '@mui/material';

import classes from './Profile.scss';
import {withRouter} from "react-router";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import Swal from 'sweetalert2';


class Profile extends Component {

    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
        this.onResolved = this.onResolved.bind(this);

    }

    state = {
        init: false,
        loading: true,
        profile: null,
        badges: [],
        message: {
            uuid: '',
            name: '',
            email: '',
            message: '',
            token: null,
            sending: false,
            error: false,
            buttonText: 'Üzenetet küldök'
        },
        captchaResponse: null
    }

    componentDidMount() {
        if (this.state.init) {
            return;
        }

        let MySwal = withReactContent(Swal);

        if (this.props.match.params.slug) {
            this.getProfile(this.props.match.params.slug);
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Felhasználói azonosító nem található',
                text: label
            })
        }
    }

    getProfile(slug) {
        if (this.state.profile) {
            return
        }

        let MySwal = withReactContent(Swal);
        this.setState({loading: true});

        axios
            .get('/api/search/get-profile/' + slug)
            .then(
                response => {
                    if (response.status === 200) {
                        this.setState({
                            profile: response.data.profile,
                            badges: response.data.badges,
                            loading: false,
                            message: {
                                ...this.state.message,
                                uuid: response.data.profile.uuid
                            },
                            init: true
                        });
                    } else {
                        MySwal.fire({
                            icon: 'error',
                            text: 'Hiba történt a profil lekérdezése közben',
                        })
                    }
                }
            )
            .catch(err => {
                MySwal.fire({
                    icon: 'error',
                    text: 'Hiba történt a profil lekérdezése közben',
                })
            });
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
            .post('/api/message/send-profile-message', message)
            .then(
                response => {
                    if (response.status === 200) {
                        this.setState({
                            message: {
                                ...this.state.message,
                                name: '',
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
        if (!this.state.profile) {
            return (
                <Grid container spacing={1}>
                    <Grid item xs={12} className="m-5 p-5">
                        <Spinner/>
                        <p className="text-center">profil betöltése folyamatban...</p>
                    </Grid>
                </Grid>
            )
        }

        let testimonials = '';
        if (this.props.testimonials) {
            testimonials = this.props.testimonials.map((testimonial) => {
                return (
                    <li key={testimonial.id}>
                        <span>
                           <FormatQuoteIcon/>{testimonial.description}
                            <br/>
                        -- <b>{testimonial.label}</b>
                            <br/>
                            <hr/>
                        </span>
                    </li>
                );
            });
        }

        let facebookIconClass = '';
        if (!this.state.profile.facebook) {
            facebookIconClass = 'disabled';
        }

        let instagramIconClass = '';
        if (!this.state.profile.instagram) {
            instagramIconClass = 'disabled';
        }

        let webIconClass = '';
        if (!this.state.profile.web) {
            webIconClass = 'disabled';
        }

        let nameBadges = this.state.badges.map((badge, i) => {
            return (<Badge key={i} className={[classes.Sign, classes.Orange, "ml-1"].join(" ")}>{badge}</Badge>);
        });

        let facebookIcon;
        if (this.state.profile.facebook) {
            facebookIcon = (
                <a href={this.state.profile.facebook} target="_blank" key="facebook"><FacebookIcon key="facebook"
                                                                                                   className={[classes.TableInfoBox, facebookIconClass, 'ml-4'].join(' ')}/></a>);
        } else {
            facebookIcon = (<FacebookIcon key="facebook"
                                          className={[classes.TableInfoBox, classes.Disabled, facebookIconClass, 'ml-4'].join(' ')}/>);
        }

        let instagramIcon;
        if (this.state.profile.instagram) {
            instagramIcon = (
                <a href={this.state.profile.instagram} target="_blank" key="instagram"><InstagramIcon key="instagram"
                                                                                                      className={[classes.TableInfoBox, instagramIconClass, 'ml-4'].join(' ')}/></a>);
        } else {
            instagramIcon = (<InstagramIcon key="instagram"
                                            className={[classes.TableInfoBox, classes.Disabled, instagramIconClass, 'ml-4'].join(' ')}/>);
        }

        let webIcon;
        if (this.state.profile.web) {
            webIcon = (<a href={this.state.profile.web} target="_blank" key="web"><LanguageIcon key="web"
                                                                                                className={[classes.TableInfoBox, webIconClass, 'ml-4'].join(' ')}/></a>);
        } else {
            webIcon = (<LanguageIcon key="web"
                                     className={[classes.TableInfoBox, classes.Disabled, webIconClass, 'ml-4'].join(' ')}/>);
        }

        let socialBoxes = [facebookIcon, instagramIcon, webIcon];

        let servicesBadges = this.state.profile.services.map((service) => {
            return (<Badge key={service.id} className={[classes.Sign, classes.Base].join(' ')}>{service.label}</Badge>);
        });

        let additionalServicesBadges = this.state.profile.additionalServices.map((service) => {
            return (<Badge key={service.id}
                           className={[classes.Sign, classes.AddServices].join(' ')}>{service.label}</Badge>);
        });

        return (
            <Container className={[classes.Profile, ""].join(' ')}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={4} md={3}>
                        <Box
                            component="img"
                            alt=""
                            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
                            width="100%"
                            height="auto"
                        />

                        <Box
                            className={[classes.SocialBoxes, 'p-1'].join(' ')}
                            width="100%"
                        >
                            {socialBoxes}
                        </Box>

                        <Box className={[classes.TableInfoBox, 'p-2'].join(' ')}>
                            <h4 className="p-1 h-0">Kapcsolat</h4>
                            <hr className="p-1 m-0"/>
                            <p className="mb-3">Csörgess meg:</p>
                            <h5 className="text-center">{this.state.profile.phone}</h5>
                            <p className="mb-2">Vagy küldj üzenetet:</p>
                            <FormControl className="w-100">
                                <TextField
                                    className="w-100 m-1 p-1"
                                    id="message_name"
                                    label='Neved'
                                    size="small"
                                    value={this.state.message.name}
                                    onChange={(event) => this.messageFieldChanged(event, 'name')}
                                />
                                <TextField
                                    className="w-100 m-1 p-1"
                                    id="message_email"
                                    label='E-mail címed'
                                    size="small"
                                    value={this.state.message.email}
                                    onChange={(event) => this.messageFieldChanged(event, 'email')}
                                />
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
                                <Button
                                    variant="outlined"
                                    className={[classes.Button, 'w-100 m-1'].join(' ')}
                                    onClick={this.sendMessage}>
                                    {this.state.message.buttonText}
                                </Button>
                                <div>
                                    <Recaptcha
                                        ref={ref => this.recaptcha = ref}
                                        sitekey="6LfJWhEiAAAAALIr3BJ2D440K-c7n5MyGYE-vWkw"
                                        onResolved={this.onResolved}/>
                                </div>
                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item xs={8} md={6}>
                        <Box className={[classes.TableInfoBox, 'pl-2 pr-2 pb-2 pt-0'].join(' ')}>
                            <h4 className="p-1 h-0">Személyes adataim</h4>
                            <hr className="p-1 m-0"/>
                            <Box textAlign="center">
                                <h3 className="m-1"><FormatQuoteIcon/>{this.state.profile.label}</h3>
                            </Box>
                            <TableContainer className="p-2">
                                <Table>
                                    <TableBody>
                                        <TableRow key="name" sx={{'td': {border: 0}}}>
                                            <TableCell align="left" style={{width: 150}} className="p-2">
                                                <p className="mb-1"><AccountBoxIcon className="mr-1" fontSize="small"/>Név:
                                                </p>
                                            </TableCell>
                                            <TableCell align="left" className="p-2" sx={{fontWeight: 600}}>
                                                <p className="mb-1">
                                                    <strong>{this.state.profile.name}</strong>{nameBadges}</p>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="place" sx={{'td': {border: 0}}}>
                                            <TableCell align="left" className="p-2">
                                                <p className="mb-1"><MapIcon className="mr-1" fontSize="small"/>Helyszín(ek):
                                                </p>
                                            </TableCell>
                                            <TableCell align="left" className="p-2" sx={{fontWeight: 600}}>
                                                <p className="mb-1">{this.state.profile.pubAddress}</p>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="phone" sx={{'td': {border: 0}}}>
                                            <TableCell align="left" className="p-2">
                                                <p className="mb-1"><SchoolIcon className="mr-1" fontSize="small"/>Gyakorlat:
                                                </p>
                                            </TableCell>
                                            <TableCell align="left" className="p-2" sx={{fontWeight: 600}}>
                                                <p className="mb-1">{this.state.profile.experience}</p>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="price" sx={{'td': {border: 0}}}>
                                            <TableCell align="left" className="p-2">
                                                <p className="mb-1"><SavingsIcon className="mr-1" fontSize="small"/>Óradíj:
                                                </p>
                                            </TableCell>
                                            <TableCell align="left" className="p-2" sx={{fontWeight: 600}}>
                                                <p className="mb-1">{this.state.profile.hourlyRate}</p>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box className={[classes.TableInfoBox, 'p-2'].join(' ')}>
                            <h4 className="p-1 h-0">Elsősorban az alábbi gyermekeket keresem</h4>
                            <hr className="p-1 m-0"/>
                            {servicesBadges}
                            <p className="mt-1">{this.state.profile.lookingFor}</p>
                        </Box>

                        <Box className={[classes.TableInfoBox, 'p-2'].join(' ')}>
                            <h4 className="p-1 h-0">Előnyben részesített időpontjaim</h4>
                            <hr className="p-1 m-0"/>
                            <p>{this.state.profile.preferredTime}</p>
                        </Box>

                        <Box className={[classes.TableInfoBox, 'p-2'].join(' ')}>
                            <h4 className="p-1 h-0">Bemutatkozásom</h4>
                            <hr className="p-1 m-0"/>
                            <Box>
                                {additionalServicesBadges}
                            </Box>
                            <p>{this.state.profile.introduction}</p>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Box className={[classes.FacebookBox, 'p-2'].join(' ')}>
                            <h4>Kövess <small>minket</small></h4>
                            <small>Facebook doboz jön ide</small>
                        </Box>

                        <Box className={classes.TopSearchBox}>
                            <h4 className="p-2">Top10 <small>bébiszitter keresés</small></h4>
                            <ol className="m-0">
                                <li><a href="#">Csecsemő - Budapest I. kerület</a></li>
                                <li><a href="#">Óvoda - Kiskunfélegyháza</a></li>
                                <li><a href="#">Ált. Isk. - Budapest XXIII. kerület</a></li>
                                <li><a href="#">Óvoda - Miskolc</a></li>
                                <li><a href="#">Csecsemő - Budapest XI. kerület</a></li>
                                <li><a href="#">Csecsemő - Budapest III. kerület</a></li>
                                <li><a href="#">Óvoda - Balatonboglár</a></li>
                                <li><a href="#">Ált. Isk. - Gödöllő</a></li>
                                <li><a href="#">Óvoda - Győr</a></li>
                                <li><a href="#">Csecsemő - Pécs</a></li>
                            </ol>
                        </Box>

                        <Box className={[classes.Testimonials, 'p-2 mb-2'].join(' ')}>
                            <h4>Rólunk <small>mondták</small></h4>
                            <ul>
                                {testimonials}
                            </ul>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        );
    }
}

export default withRouter(Profile);