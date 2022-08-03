// noinspection JSAnnotator

import React, {Component} from 'react';
import {Box, Container, Grid, MenuItem, Select} from '@material-ui/core';
import Page from '../../../components/Page';
// import ProfileDetailsGroup from './ProfileDetailsGroup';
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router";
import AuthService from '../../../AuthService';

import Spinner from '../../../../../app/components/UI/Spinner/Spinner';
import axios from "axios";
import Aux from "../../../../../app/hoc/Aux";

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EditIcon from '@material-ui/icons/Edit';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import FacebookIcon from "@material-ui/icons/Facebook";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import PlaceIcon from "@material-ui/icons/Place";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import LanguageIcon from '@material-ui/icons/Language';
import SaveIcon from '@material-ui/icons/Save';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PersonSearchIcon from '@material-ui/icons/Autorenew';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Profile from "./Profile";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import DropzoneArea from "../../../../../app/components/DropzoneArea/DropzoneArea";
import ProfileDetails from "./ProfileDetails";
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import {LocalizationProvider, DatePicker, DateTimePicker} from '@mui/x-date-pickers';
import moment from 'moment';
import SelectItem from "../../../../../app/components/SearchForm/SelectItem/SelectItem";
import history from "../../../../../app/store/history/history";
import Alert from "@material-ui/lab/Alert";

const MySwal = withReactContent(Swal)

// import PropTypes from 'prop-types';
// import {makeStyles} from '@material-ui/core/styles';

const useStyles = theme => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
});

class Account extends Component {

    state = {
        loading: true,
        init: false,
        activeTab: 0,
        profile: null,
        services: null,
        additionalServices: null,
        places: null,
        group: null,
        payModes: null,
        packages: null,
        languages: null,
        renewBtnDisabled: null,
        formErrors: []
    }

    a11yProps(index) {
        return {
            id: `scrollable-auto-tab-${index}`,
            'aria-controls': `scrollable-auto-ProfileDetails-${index}`,
        };
    }

    componentDidMount() {
        if (this.state.init) {
            return
        }

        if (this.props.match.params.uuid) {
            this.getProfile(this.props.match.params.uuid);
        } else {
            Swal.fire(
                'Hiba történt!',
                'Hiányzó felhasználói azonosító. Kérlek, jelentkezz be újra.',
                'warning'
            )
        }
    }

    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    getProfile(uuid) {
        if (this.state.profile) {
            return
        }

        this.setState({loading: true});

        // kilép, ha lejárt
        if (AuthService.isTokenExpired()) {
            Swal.fire(
                'Lejárt a munkamenet',
                'Kérlek, jelentkez be újra',
                'warning'
            )

            history.push('/bejelentkezes');
            window.location.reload();
        }

        // profil adatok lekérése
        axios
            .get('/admin/api/profile/get-profile/' + uuid, {headers: AuthService.getAuthHeader()})
            .then(response => {
                response.data.regStart = response.data.regStart ? moment(response.data.regStart) : null;
                response.data.regEnd = response.data.regEnd ? moment(response.data.regEnd) : null;
                response.data.created = response.data.created ? moment(response.data.created) : null;
                response.data.lastUpdate = response.data.lastUpdate ? moment(response.data.lastUpdate) : null;
                response.data.newMemberSign = response.data.newMemberSign ? moment(response.data.newMemberSign) : null;
                response.data.highlighted = response.data.highlighted ? moment(response.data.highlighted) : null;

                // helyeket kicsit kozmetikázni kell /entity érkezik, object kell/
                let places = [];
                if (response.data.places) {
                    response.data.places.forEach((item) => {
                        let place = {
                            id: item.id,
                            label: item.cityLabel,
                            value: item.cityCode
                        }
                        places.push(place);
                    });
                }

                response.data.places = places;
                this.setState({profile: response.data, uuid: uuid, loading: false, init: true});
            })
            .catch((e) => {
                Swal.fire(
                    'Hiba történt',
                    'A profil adatok betöltése nem sikerült. Kérjük, próbáld meg ismét.',
                    'warning'
                )
            });

        // szolgáltatások lekérése
        axios
            .get('/admin/api/list-items/additional-service/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({additionalServices: response.data});
            });

        // kieg. szolgáltatások lekérése
        axios
            .get('/admin/api/list-items/service/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({services: response.data});
            });

        // helyek lekérése
        axios
            .get('/admin/api/list-items/place/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({places: response.data});
            });

        // fizetési módok
        axios
            .get('/admin/api/list-items/paymode/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({payModes: response.data});
            });

        // díjcsomagok
        axios
            .get('/admin/api/list-items/package/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({packages: response.data});
            });

        // nyelvek
        axios
            .get('/admin/api/list-items/language/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({languages: response.data});
            });

        // csoportok
        axios
            .get('/admin/api/list-items/group/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({groups: response.data});
            });
    }

    onTabClick(activeTab) {
        this.setState({activeTab: parseInt(activeTab, 10)});
    }

    setDateValue(id, newValue) {
        let newDate = null;

        if (newValue !== '' && newValue !== null) {
            newDate = moment(newValue);
        }

        this.setState({
            profile: {
                ...this.state.profile,
                [id]: newDate
            }
        });
    }

    setTextValue(id, event) {

        this.setState({
            profile: {
                ...this.state.profile,
                [id]: event.target.value
            }
        });
    }

    setPackageValue(event) {
        let newPackage = null;
        for (let p of this.state.packages) {
            if (p.id === event.target.value) {
                newPackage = p;
                break;
            }
        }

        if (newPackage) {
            this.setState({
                profile: {
                    ...this.state.profile,
                    package: newPackage
                }
            })
        }
    }

    setGroupsValue(event) {
        let newGroup = null;
        for (let g of this.state.groups) {
            if (g.id === event.target.value) {
                newGroup = g;
                break;
            }
        }

        if (newGroup) {
            this.setState({
                profile: {
                    ...this.state.groups,
                    groups: newGroup
                }
            })
        }
    }

    setSwitchValue(event) {
        this.setState({
            profile: {
                ...this.state.profile,
                [event.target.name]: event.target.checked
            }
        })
    }

    setServicesSwitchValue(event, key, id) {

        if (event.target.checked) {
            const newValue = this.state[key].filter((item) => item.id === id);
            this.setState({
                profile: {
                    ...this.state.profile,
                    [key]: [...this.state.profile[key], newValue[0]
                    ]
                }
            })
        } else {
            // töröl
            const newValue = this.state.profile[key].filter((item) => item.id !== id);
            this.setState({
                profile: {
                    ...this.state.profile,
                    [key]: newValue
                }
            });
        }
    }

    onPlacesSelectChanged(places) {
        this.setState({
            profile: {
                ...this.state.profile,
                places: places
            }
        })
    }

    onGroupsSelectChanged(groups) {
        this.setState({
            profile: {
                ...this.state.profile,
                groups: groups
            }
        })
    }

    onLanguagesSelectChanged(languages) {
        this.setState({
            profile: {
                ...this.state.languages,
                languages: languages
            }
        })
    }

    addPackage() {
        const MySwal = withReactContent(Swal)

        // nincsen kezdeti dátum
        if (!this.state.profile.regStart) {

            const regEnd = moment().add(this.state.profile.package.days, 'days');

            if (regEnd.isValid()) {
                this.setState({
                    profile: {
                        ...this.state.profile,
                        regStart: moment(),
                        regEnd: regEnd
                    }
                })

                Swal.fire(
                    'Hozzáadás sikeres',
                    'Az új lejárati dátum: <strong>' + regEnd.format('YYYY.MM.DD') + '</strong>',
                    'success'
                )
            }

            // van kezdeti dátum - a kezdeti nem változik
        } else if (moment.isMoment(this.state.profile.regStart)) {

            let regStart = this.state.profile.regStart;

            // korábbi a kezdeti dátum, a mai naphoz képest nézzük a lejáratot.
            if (regStart.isSameOrBefore(moment())) {
                regStart = moment();
            }

            // ha nincsen vége dátum, vagy a múltban van, akkor a kezdetihez adjuk hozzá
            if (!this.state.profile.regEnd || moment.isMoment(this.state.profile.regEnd) && this.state.profile.regEnd.isSameOrBefore(moment())) {

                const regEnd = regStart.add(this.state.profile.package.days, 'days');

                if (regEnd.isValid()) {
                    this.setState({
                        profile: {
                            ...this.state.profile,
                            regEnd: regEnd
                        }
                    })

                    Swal.fire(
                        'Hozzáadás sikeres',
                        'Az új lejárati dátum: <strong>' + regEnd.format('YYYY.MM.DD') + '</strong>',
                        'success'
                    )
                }

                // van vége dátum a jövőben
            } else if (moment.isMoment(this.state.profile.regEnd) && this.state.profile.regEnd.isAfter(moment())) {

                const regEnd = this.state.profile.regEnd.add(this.state.profile.package.days, 'days');

                if (regEnd.isValid()) {
                    this.setState({
                        profile: {
                            ...this.state.profile,
                            regEnd: regEnd
                        }
                    });

                    Swal.fire(
                        'Hozzáadás sikeres',
                        'Az új lejárati dátum: <strong>' + regEnd.format('YYYY.MM.DD') + '</strong>',
                        'success'
                    )
                }

            }
        }
    }

    profileRenew() {
        const MySwal = withReactContent(Swal)

        if (AuthService.isTokenExpired()) {
            Swal.fire(
                'Lejárt a munkamenet',
                'Előre helyezés nem indítható, kérlek, jelentkezz be újra.',
                'warning'
            )

            return;
        }

        if (!this.state.profile.renewAvailable || !parseInt(this.state.profile.renewAvailable, 10) > 0) {
            MySwal.fire({
                title: 'Előre helyezés nem lehetséges',
                text: 'Nincsen felhasználható előre helyezés. Kérlek, vedd fel a kapcsolatot az ügyfélszolgálatunkkal.',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#6A1B9A',
                confirmButtonText: 'Bezárás',
                footer: '<a href="#">ügyfélszolgálat elérése</a>'       // todo: ügyfélszoli href
            });

            return;
        }

        MySwal.fire({
            title: 'Tagság előre helyezése',
            text: 'Megerősítés után az adatlap a találati listák elején fog megjelenni.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6A1B9A',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Mégsem',
            confirmButtonText: 'Előre helyezés'
        }).then((result) => {
            if (result.isConfirmed) {

                this.setState({
                    renewBtnDisabled: true
                });

                // profil adatok lekérése
                axios
                    .put('/admin/api/profile/renew-now/' + this.state.uuid, null, {headers: AuthService.getAuthHeader()})
                    .then(response => {

                        if (response.data.success) {
                            this.setState({
                                profile: {
                                    ...this.state.profile,
                                    renewAvailable: response.data.renewAvaiable,
                                    lastRenewed: moment(response.data.lastRenewed),
                                    lastUpdate: moment(response.data.lastUpdate)
                                },
                            });

                            Swal.fire(
                                'Sikeres előre helyezés',
                                'Az adatlap a találati listák élre került.',
                                'success'
                            );

                        } else {
                            Swal.fire(
                                'Hiba történt',
                                response.data.message || 'Az előre helyezés nem sikerült!',
                                'error'
                            );
                        }

                        this.setState({
                            renewBtnDisabled: false
                        });
                    });

            }
        })
    }

    onAdminProfileFormSubmit() {
        const MySwal = withReactContent(Swal);

        if (AuthService.isTokenExpired()) {
            Swal.fire(
                'Lejárt a munkamenet',
                'Adatok mentése nem indítható, kérlek, jelentkezz be újra.',
                'warning'
            )

            return;
        }

        this.setState({formErrors: []});

        let profile = this.state.profile;

        MySwal.fire({
            title: 'Módosítások mentése',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6A1B9A',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Mégsem',
            confirmButtonText: 'Mentés',
            showLoaderOnConfirm: true,
            backdrop: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {

                return axios
                    .put('/admin/api/profile/save/' + this.state.uuid, profile, {headers: AuthService.getAuthHeader()})
                    .then(response => {
                        return response;
                    })
                    .catch(err => {
                        if (err.response.data) {
                            return err.response.data.errors;
                        } else {
                            return null;
                        }
                    });
            }

        }).then((result) => {
            if (result.isConfirmed) {

                if (result.value.data) {

                    result.value.data.regStart = result.value.data.regStart ? moment(result.value.data.regStart) : null;
                    result.value.data.regEnd = result.value.data.regEnd ? moment(result.value.data.regEnd) : null;
                    result.value.data.created = result.value.data.created ? moment(result.value.data.created) : null;
                    result.value.data.lastUpdate = result.value.data.lastUpdate ? moment(result.value.data.lastUpdate) : null;
                    result.value.data.newMemberSign = result.value.data.newMemberSign ? moment(result.value.data.newMemberSign) : null;
                    result.value.data.highlighted = result.value.data.highlighted ? moment(result.value.data.highlighted) : null;

                    // helyeket kicsit kozmetikázni kell /entity érkezik, object kell/
                    let places = [];
                    if (result.value.data.places) {
                        result.value.data.places.forEach((item) => {
                            let place = {
                                id: item.id,
                                label: item.cityLabel,
                                value: item.cityCode
                            }
                            places.push(place);
                        });
                    }

                    result.value.data.places = places;
                    this.setState({profile: result.value.data});

                    MySwal.fire({
                        title: 'Sikeres mentés',
                        text: 'A módosításokat sikeresen elmentettük.',
                        icon: 'success'
                    });

                } else {

                    let errorMsg = '';
                    for (const i in result.value) {
                        errorMsg += result.value[i] + ' ';
                    }

                    this.setState({formErrors: result.value});

                    MySwal.fire({
                        icon: 'error',
                        title: 'Hiba történt',
                        text: errorMsg,
                    });

                    // } else {
                    //
                    //     MySwal.fire({
                    //         icon: 'error',
                    //         title: 'Hiba történt...',
                    //         text: 'Hiba történt a mentés során. Kérlek, ellenőrizd az adatokat, vagy vedd fel a kapcsolatot az ügyfélszolgálatunkkal.',
                    //         footer: '<a href="#">ügyfélszolgálat elérése</a>'       // todo: ügyfélszoli href
                    //     });
                }
            }
        })
    }


    render() {
        const classes = this.props;
        let profile = null;
        let icon;

        if (this.state.loading) {
            profile = (<Box mt={3}><Spinner/></Box>);
        } else {
            let icon;
            switch (this.state.profile.status.icon) {
                case 'HelpOutlineIcon':
                    icon = <HelpOutlineIcon/>;
                    break;
                case 'HourglassEmptyIcon':
                    icon = <HourglassEmptyIcon/>;
                    break;
                case 'CheckCircleIcon':
                    icon = <CheckCircleIcon/>;
                    break;
                case 'SentimentVeryDissatisfiedIcon':
                    icon = <SentimentVeryDissatisfiedIcon/>;
                    break;
                case 'PauseCircleFilledIcon':
                    icon = <PauseCircleFilledIcon/>;
                    break;
                case 'FavoriteIcon':
                    icon = <FavoriteIcon/>;
                    break;
                case 'AvTimerIcon':
                    icon = <AvTimerIcon/>;
                    break;
                case 'EditIcon':
                    icon = <EditIcon/>;
                    break;
            }

            //  *********************************
            //  Innen kezdődik a beágyazott blokk
            //  *********************************

            // szolgáltatások
            let services = null;
            if (!this.state.services || !this.state.profile.services) {

                services = (<Box mt={3}><Spinner/></Box>);

            } else {

                services = this.state.services.map(service => {
                    let checked = false;
                    for (let key in this.state.profile.services) {
                        if (this.state.profile.services[key].id === service.id) {
                            checked = true;
                        }
                    }

                    return (
                        <Grid item xs={6} key={service.id} m={0} p={0}>
                            <Box key={service.id} display="flex" justifyContent="flex-start" mb={0} p={1}>
                                <Box pr={2}>
                                    <Switch key={service.id}
                                            data-id={service.id}
                                            checked={checked}
                                            color="primary"
                                            name={service.name}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                            onChange={(event) => {
                                                this.setServicesSwitchValue(event, 'services', service.id);
                                            }}
                                    />
                                </Box>
                                <Box pt={1}>
                                    {service.label}
                                </Box>
                            </Box>
                        </Grid>
                    );
                });
            }

            // kiegészítő szolgáltatások
            let additionalServices = null;
            if (!this.state.additionalServices || !this.state.profile.additionalServices) {

                additionalServices = (<Box mt={3}><Spinner/></Box>);

            } else {

                additionalServices = this.state.additionalServices.map(additionalService => {
                    let checked = false;

                    for (let key in this.state.profile.additionalServices) {
                        if (this.state.profile.additionalServices[key].id === additionalService.id) {
                            checked = true;
                        }
                    }

                    return (
                        <Grid item xs={6} key={additionalService.id} m={0} p={0}>
                            <Box key={additionalService.id} display="flex" justifyContent="flex-start" mb={0} p={1}>
                                <Box pr={2}>
                                    <Switch
                                        key={additionalService.id}
                                        data-id={additionalService.id}
                                        checked={checked}
                                        color="primary"
                                        name={additionalService.name}
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                        onChange={(event) => {
                                            this.setServicesSwitchValue(event, 'additionalServices', additionalService.id);
                                        }}
                                    />
                                </Box>
                                <Box pt={1}>
                                    {additionalService.label}
                                </Box>
                            </Box>
                        </Grid>
                    );
                });
            }

            // nyelvek
            let languages = null;
            if (!this.state.languages || !this.state.profile.languages) {

                languages = (<Box mt={3}><Spinner/></Box>);

            } else {

                languages = this.state.languages.map(language => {
                    let checked = false;
                    for (let key in this.state.profile.languages) {
                        if (this.state.profile.languages[key].id === language.id) {
                            checked = true;
                        }
                    }

                    return (
                        <Grid item xs={3} key={language.id} m={0} p={0}>
                            <Box display="flex" justifyContent="flex-start" mb={0} p={1}>
                                <Box pr={2}>
                                    <Switch
                                        checked={checked}
                                        key={language.id}
                                        data-id={language.id}
                                        color="primary"
                                        // name={language.name}
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                        onChange={(event) => {
                                            this.setServicesSwitchValue(event, 'languages', language.id);
                                        }}
                                    />
                                </Box>
                                <Box pt={1}>
                                    {language.label}
                                </Box>
                            </Box>
                        </Grid>
                    );
                });
            }

            // helyek
            let places = null;
            if (!this.state.places || !this.state.profile.places) {

                places = (<Box mt={3}><Spinner/></Box>);

            } else {

                places = (
                    <Paper elevation={3} bgcolor="#f7f7f7">
                        <Box p={3} mb={3} height={500}>
                            <p>Kezd el géplni a keresett város nevét, majd kattints a nevére, hogy a listába kerüljön.
                                Törölni a listából a piros "x" jelre
                                kattintva
                                lehet. Több helyszínt is kiválaszthatsz.</p>

                            <Grid container spacing={5}>
                                <Grid item xs={12}>

                                    <SelectItem placeholder='Helyszínek' options={this.state.places} isMulti={true}
                                                selected={this.state.profile.places}
                                                change={(event) => this.onPlacesSelectChanged(event)} font="Roboto"/>

                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                );
            }

            // csoportok
            let groups = null;
            if (!this.state.groups || !this.state.profile.groups) {

                groups = (<Box mt={3}><Spinner/></Box>);

            } else {

                groups = this.state.groups.map(group => {
                    let checked = false;
                    for (let key in this.state.profile.groups) {
                        if (this.state.profile.groups[key].id === group.id) {
                            checked = true;
                        }
                    }

                    return (
                        <Grid item xs={3} key={group.id} m={0} p={0}>
                            <Box key={group.id} display="flex" justifyContent="flex-start" mb={0} p={1}>
                                <Box pr={2}>
                                    <Switch
                                        key={group.id}
                                        checked={checked}
                                        data-id={group.id}
                                        color="primary"
                                        name={group.name}
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                        onChange={(event) => {
                                            this.setServicesSwitchValue(event, 'groups', group.id);
                                        }}
                                    />
                                </Box>
                                <Box pt={1}>
                                    {group.label}
                                </Box>
                            </Box>
                        </Grid>
                    );
                });
            }

            let packages = '';
            let packagesValue = ''
            if (this.state.packages) {
                packagesValue = this.state.profile.package.id;
                packages = this.state.packages.map(pack => {
                    return (<MenuItem value={pack.id} key={pack.id}>{pack.label}</MenuItem>);
                });
            }

            let remainingDays = '';
            let regEnd = '';
            if (this.state.profile.regEnd && moment(this.state.profile.regEnd, 'YYYY-MM-DD').isValid()) {
                let now = moment();
                regEnd = moment(this.state.profile.regEnd, 'YYYY-MM-DD');
                remainingDays = regEnd.diff(now, 'days');
            }

            const regStart = this.state.formErrors['regStart'] ? this.state.formErrors['regStart'] : 'Ettől kezdve jelenik meg az adatlap publikusan.';
            const name = this.state.formErrors['name'] ? this.state.formErrors['name'] : 'Profilodon megjelenő neved (*)';
            const address = this.state.formErrors['address'] ? this.state.formErrors['address'] : 'Pontos címed, nem jelenik meg az adatlapon (*)';
            // const username = this.state.formErrors['username'] ? this.state.formErrors['username'] : 'E-mail címed, mely a bejelentkezési név is. (*)';
            const phone = this.state.formErrors['phone'] ? this.state.formErrors['phone'] : 'Telefonszám, csak számjegyek (*)';
            const pubAddress = this.state.formErrors['pubAddress'] ? this.state.formErrors['pubAddress'] : "Publikus, adatlapon megjelenő 'címed', ahol elérhető vagy. Pl. 'Budapesten a belvárosban', vagy 'Kecskeméten és környékén'. (*)";
            const username = this.state.formErrors['username'] ? this.state.formErrors['username'] : 'Egyben a felhasználóneved is (*)';
            const plainPassword = this.state.formErrors['plainPassword'] ? this.state.formErrors['plainPassword'] : 'Ezzel a jelszóval tudsz majd bejelentkezni. Legalább 6 karakter, tartalmaznia kell számot, kis és nagybetűt is. (*)';
            const rePlainPassword = this.state.formErrors['plainPassword'] ? this.state.formErrors['plainPassword'] : 'Jelszó ismétlése (*)';
            const shortIntroduction = this.state.formErrors['shortIntroduction'] ? this.state.formErrors['shortIntroduction'] : 'Rövid bemutatkozó szöveg, a találati listában jelenik meg. (*)';
            const introduction = this.state.formErrors['introduction'] ? this.state.formErrors['introduction'] : 'Profilodon megjelenő részletes bemutatkozó szöveg. (*)';
            const web = this.state.formErrors['web'] ? this.state.formErrors['web'] : 'weboldalad címe, pl. https://www.kovacspeter.hu';
            const facebook = this.state.formErrors['facebook'] ? this.state.formErrors['facebook'] : 'facebook profil elérhetőség, pl. https://www.facebook.com/kovacs.peter';
            const invoiceName = this.state.formErrors['invoiceName'] ? this.state.formErrors['invoiceName'] : 'Számlázási név.';
            const invoiceAddress = this.state.formErrors['invoiceAddress'] ? this.state.formErrors['invoiceAddress'] : 'Számlázási cím.';
            const taxnumber = this.state.formErrors['taxnumber'] ? this.state.formErrors['taxnumber'] : 'Adószám, cég esetén kötelező.';
            const instagram = this.state.formErrors['instagram'] ? this.state.formErrors['instagram'] : 'Instagram elérhetőség, pl. https://www.instagram.com/kovacs.peter';
            const source = this.state.formErrors['source'] ? this.state.formErrors['source'] : 'Honnan hallottál rólunk?';
            const hourlyRate = this.state.formErrors['hourlyRate'] ? this.state.formErrors['hourlyRate'] : 'Óradíjad. Lehet konkrét összeg, nagyságrend, rövid leírás a díjakkal kapcsolatban, stb.';
            const highlighted = this.state.formErrors['highlighted'] ? this.state.formErrors['highlighted'] : 'Tagságod eddig az ideig kiemeltként jelenik meg az oldalon.';
            const renewAvailable = this.state.formErrors['renewAvailable'] ? this.state.formErrors['renewAvailable'] : 'Rendelkezésre álló kiemelések száma.';
            const slug = this.state.formErrors['slug'] ? this.state.formErrors['slug'] : 'Ezen a linken keresztül érhető el a személyes profil oldalad.';
            const title = this.state.formErrors['title'] ? this.state.formErrors['title'] : 'Böngésző címsorban megjelenő szöveg.';
            const meta = this.state.formErrors['meta'] ? this.state.formErrors['meta'] : 'Adatlapon megjelenő meta leírás.';
            const newMemberSign = this.state.formErrors['newMemberSign'] ? this.state.formErrors['newMemberSign'] : 'Eddig a dátumig az adatlapod kiemelten, "ÚJ" megjelöléssel jelenik meg.';
            const languageErrors = this.state.formErrors['languages'] ? (
                <Alert severity="error">{this.state.formErrors['languages']}</Alert>) : '';
            const additionalServiceErrors = this.state.formErrors['additionalServices'] ? (
                <Alert severity="error">{this.state.formErrors['additionalServices']}</Alert>) : '';
            const groupsErrors = this.state.formErrors['groups'] ? (
                <Alert severity="error">{this.state.formErrors['groups']}</Alert>) : '';
            const placesErrors = this.state.formErrors['place'] ? (
                <Alert severity="error">{this.state.formErrors['place']}</Alert>) : '';
            const packageErrors = this.state.formErrors['package'] ? (
                <Alert severity="error">{this.state.formErrors['package']}</Alert>) : '';
            const payModeErrors = this.state.formErrors['payMode'] ? (
                <Alert severity="error">{this.state.formErrors['payMode']}</Alert>) : '';
            const imageErrors = this.state.formErrors['image'] ? (
                <Alert severity="error">{this.state.formErrors['image']}</Alert>) : '';
            const serviceErrors = this.state.formErrors['service'] ? (
                <Alert severity="error">{this.state.formErrors['service']}</Alert>) : '';


            profile = (
                <Page className={classes.root} title={this.state.profile.name + " - TutiBébiszitter.hu"}>
                    {/*<Container maxWidth="lg">*/}
                    {/*    <Grid container spacing={3}>*/}
                    {/*        <Grid item xs={12}>*/}
                    {/*            <Chip style={{backgroundColor: this.state.profile.status.color}} color="primary" icon={icon}*/}
                    {/*                  label={this.state.profile.status.text}/>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Container>*/}
                    <Container maxWidth="xl">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>


                                {/*<ProfileDetailsGroup profile={this.state}/>*/}
                                {/*<div className={classes.root}>*/}
                                <div>
                                    <AppBar position="static" color="default">
                                        <Tabs
                                            value={this.state.activeTab}
                                            // onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="scrollable"
                                            scrollButtons="auto"
                                            aria-label="scrollable auto tabs example"
                                        >
                                            <Tab label="Áttekintés" icon={<PersonPinIcon/>} {...this.a11yProps(0)}
                                                 onClick={() => this.onTabClick('0')}/>
                                            <Tab label="Személyes adatok" icon={<PersonIcon/>} {...this.a11yProps(1)}
                                                 onClick={() => this.onTabClick('1')}/>
                                            <Tab label="Bemutatkozás" icon={<ChatIcon/>} {...this.a11yProps(2)}
                                                 onClick={() => this.onTabClick('2')}/>
                                            <Tab label="Közösségi média" icon={<FacebookIcon/>} {...this.a11yProps(3)}
                                                 onClick={() => this.onTabClick('3')}/>
                                            <Tab label="Szolgáltatások" icon={<ChildCareIcon/>} {...this.a11yProps(4)}
                                                 onClick={() => this.onTabClick('4')}/>
                                            <Tab label="Nyelvek, csoportok"
                                                 icon={<LanguageIcon/>} {...this.a11yProps(5)}
                                                 onClick={() => this.onTabClick('5')}/>
                                            <Tab label="Helyszínek" icon={<PlaceIcon/>} {...this.a11yProps(6)}
                                                 onClick={() => this.onTabClick('6')}/>
                                            <Tab label="Kiemelések" icon={<LoyaltyIcon/>} {...this.a11yProps(7)}
                                                 onClick={() => this.onTabClick('7')}/>
                                            <Tab label="SEO" icon={<PersonSearchIcon/>} {...this.a11yProps(8)}
                                                 onClick={() => this.onTabClick('8')}/>
                                            <Tab label="Galéria" icon={<PhotoCameraIcon/>} {...this.a11yProps(9)}
                                                 onClick={() => this.onTabClick('9')}/>
                                            {/*<Tab label="Előzmények" icon={<RestoreIcon/>} {...this.a11yProps(10)} onClick={() => this.onTabClick('10')}/>*/}
                                        </Tabs>
                                    </AppBar>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>

                    <Container maxWidth="lg">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div>
                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={0}>
                                        <Container maxWidth="lg">
                                            <Grid
                                                container
                                                spacing={3}
                                            >
                                                <Grid
                                                    item
                                                    lg={4}
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <Paper elevation={3} bgcolor="#f7f7f7">
                                                        <Profile profileName={this.state.profile.name}
                                                                 status={this.state.profile.status} icon={icon}
                                                                 profileImage='/static/images/avatars/avatar_6.png'/>
                                                    </Paper>
                                                    {/*<Grid container spacing={3}>*/}
                                                    {/*    <Grid item xs={12}>*/}
                                                    {/*        */}
                                                    {/*    </Grid>*/}
                                                    {/*</Grid>*/}
                                                </Grid>
                                                <Grid
                                                    item
                                                    lg={8}
                                                    md={6}
                                                    xs={12}
                                                >
                                                    <Paper elevation={3} bgcolor="#f7f7f7">
                                                        <Box p={3} mb={3}>
                                                            <h5>Legfontosabb dátumok</h5>
                                                            <p>Regisztrációval kapcsolatos legfontosabb adatok.</p>

                                                            <Grid container spacing={3}>
                                                                <Grid item xs={6}>

                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DatePicker
                                                                            variant="outlined"
                                                                            error={'regStart' in this.state.formErrors}
                                                                            id="regStart"
                                                                            name="regStart"
                                                                            label="Aktív tagság kezdete"
                                                                            views={['year', 'month', 'day']}
                                                                            inputFormat="yyyy.MM.DD"
                                                                            placeholderText="éééé.hh.nn"
                                                                            mask="____.__.__"
                                                                            value={this.state.profile.regStart || null}
                                                                            onChange={(newValue) => {
                                                                                this.setDateValue('regStart', newValue);
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params}
                                                                                           helperText="Megjelenés kezdeti dátuma."/>}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DatePicker
                                                                            variant="outlined"
                                                                            id="regEnd"
                                                                            name="regEnd"
                                                                            label="Aktív tagság vége"
                                                                            views={['year', 'month', 'day']}
                                                                            inputFormat="yyyy.MM.DD"
                                                                            placeholder="éééé.hh.nn"
                                                                            mask="____.__.__"
                                                                            value={regEnd || null}
                                                                            onChange={(newValue) => {
                                                                                this.setDateValue('regEnd', newValue);
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params}
                                                                                           helperText="Eddig jelenik meg az adatlap nyilvánosan."/>}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Grid>
                                                            </Grid>

                                                            <Grid container spacing={3}>
                                                                <Grid item xs={6}>
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DateTimePicker
                                                                            readOnly
                                                                            variant="outlined"
                                                                            id="created"
                                                                            name="created"
                                                                            label="Jelentkezés dátuma"
                                                                            views={['year', 'month', 'day']}
                                                                            inputFormat="yyyy.MM.DD HH:mm:ss"
                                                                            value={this.state.profile.created}
                                                                            onChange={() => {
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params}
                                                                                           helperText="Regisztráció dátuma."/>}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}
                                                                                          adapterLocale="huLocale">
                                                                        <DateTimePicker
                                                                            readOnly
                                                                            variant="outlined"
                                                                            id="lastUpdate"
                                                                            name="lastUpdate"
                                                                            label="Utolsó módosítás"
                                                                            views={['year', 'month', 'day']}
                                                                            inputFormat="yyyy.MM.DD HH:mm:ss"
                                                                            value={this.state.profile.lastUpdate}
                                                                            onChange={() => {
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params}
                                                                                           helperText="Utolsó adatmódosítás ideje."/>}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>

                                                    <Paper elevation={3} bgcolor="#f7f7f7">
                                                        <Box p={3} mb={3}>
                                                            <h5>Díjcsomag</h5>
                                                            <p>Előfizetéses csomag adatai.</p>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={4}>
                                                                    {/*<InputLabel id="demo-simple-select-outlined-label">Díjcsomag</InputLabel>*/}
                                                                    <Select
                                                                        fullWidth
                                                                        labelId="package"
                                                                        id="package"
                                                                        value={packagesValue}
                                                                        onChange={(event) => {
                                                                            this.setPackageValue(event);
                                                                        }}
                                                                        label="Package"
                                                                    >
                                                                        {packages}
                                                                    </Select>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <Button fullWidth variant="contained"
                                                                            color="primary" onClick={() => {
                                                                        this.addPackage();
                                                                    }}>
                                                                        <Box mr={1}>
                                                                            <ControlPointIcon/>
                                                                        </Box>
                                                                        hozzáad
                                                                    </Button>
                                                                </Grid>

                                                                <Grid item xs={3}>
                                                                    <TextField
                                                                        // error={'pubAddress' in this.props.formErrors}
                                                                        readOnly
                                                                        fullWidth
                                                                        label="Díjcsomag napok"
                                                                        name="packageDays"
                                                                        id="packageDays"
                                                                        value={this.state.profile.package.days || ''}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        helperText="Díjcsomagban lévő napok száma"
                                                                        onChange={() => {
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={3}>
                                                                    <TextField
                                                                        // error={'pubAddress' in this.props.formErrors}
                                                                        readOnly
                                                                        fullWidth
                                                                        label="Hátralévő napok"
                                                                        name="remainingDays"
                                                                        id="remainingDays"
                                                                        value={remainingDays}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        helperText="Hátralévő napok száma"
                                                                        onChange={() => {
                                                                        }}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                            </Grid>

                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>

                                                    <Paper elevation={3} bgcolor="#f7f7f7">
                                                        <Box p={3} pb={0} mb={0}>
                                                            <h5>Tagság aktiválása / inaktiválása</h5>
                                                            <p>Engedélyezés, tiltás, szüneteltetés.</p>
                                                            <Grid item xs={12}>
                                                                <Box display="flex" justifyContent="flex-start" mb={0}
                                                                     p={1}>
                                                                    <Box pr={2}>
                                                                        <Switch
                                                                            checked={this.state.profile.enabled}
                                                                            onChange={(event) => {
                                                                                this.setSwitchValue(event);
                                                                            }}
                                                                            name="enabled"
                                                                            id="enabled"
                                                                            color="primary"
                                                                        />
                                                                    </Box>
                                                                    <Box>
                                                                        Tagság jóváhagyása. Bekapcsolat állapotban az
                                                                        adatlap nyilvánosan megjelenik (az 'Aktív
                                                                        tagság' dátumok beállításától függően).

                                                                    </Box>
                                                                </Box>
                                                            </Grid>

                                                            <Grid item xs={12}>
                                                                <Box display="flex" justifyContent="flex-start" mb={0}
                                                                     p={1}>
                                                                    <Box pr={2}>
                                                                        <Switch
                                                                            checked={this.state.profile.active}
                                                                            onChange={(event) => {
                                                                                this.setSwitchValue(event);
                                                                            }}
                                                                            name="active"
                                                                            id="active"
                                                                            color="primary"
                                                                        />
                                                                    </Box>
                                                                    <Box>
                                                                        Megjelenés engedélyezése vagy szüneteltetése.
                                                                        Kikapcsolt állapotban az adatlap nem
                                                                        jelenik meg nyílvánosan.
                                                                        Hasznos, ha átmenetileg szüneteltetni kell a
                                                                        profilt pl. elfoglaltság miatt. Fontos,
                                                                        hogy a szüneteltetés idejével nem hosszabodik
                                                                        meg a tagsági idő.
                                                                    </Box>
                                                                </Box>
                                                            </Grid>

                                                        </Box>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </ProfileDetails>
                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={1}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Alap adatok</h5>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'name' in this.state.formErrors}
                                                            fullWidth
                                                            label="Név"
                                                            name="name"
                                                            id="name"
                                                            value={this.state.profile.name || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={name}
                                                            onChange={(event) => {
                                                                this.setTextValue('name', event);
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'address' in this.state.formErrors}
                                                            fullWidth
                                                            label="Postázási cím"
                                                            name="address"
                                                            id="address"
                                                            value={this.state.profile.address || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={address}
                                                            onChange={(event) => {
                                                                this.setTextValue('address', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'phone' in this.state.formErrors}
                                                            fullWidth
                                                            label="Telefonszám"
                                                            name="phone"
                                                            id="phone"
                                                            value={this.state.profile.phone || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={phone}
                                                            onChange={(event) => {
                                                                this.setTextValue('phone', event);
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'pubAddress' in this.state.formErrors}
                                                            fullWidth
                                                            label="Nyilvános cím"
                                                            name="pubAddress"
                                                            id="pubAddress"
                                                            value={this.state.profile.pubAddress || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={pubAddress}
                                                            onChange={(event) => {
                                                                this.setTextValue('pubAddress', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Bejelentkezési adatok</h5>
                                                <p>Weboldalon történő bejelentkezéshez. A megadott jelszavaknak -az
                                                    ellenőrzés végett- egyezniük kell.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'username' in this.state.formErrors}
                                                            fullWidth
                                                            label="E-mail cím"
                                                            name="username"
                                                            id="username"
                                                            value={this.state.profile.username}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={username}
                                                            onChange={(event) => {
                                                                this.setTextValue('username', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'plainPassword' in this.state.formErrors}
                                                            fullWidth
                                                            label="Bejelentkezési jelszó"
                                                            name="plainPassword"
                                                            id="plainPassword"
                                                            value={this.state.profile.plainPassword || ''}
                                                            type="password"
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={plainPassword}
                                                            onChange={(event) => {
                                                                this.setTextValue('plainPassword', event);
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'rePlainPassword' in this.state.formErrors}
                                                            fullWidth
                                                            label="Jelszó ismét"
                                                            name="rePlainPassword"
                                                            id="rePlainPassword"
                                                            value={this.state.profile.rePlainPassword || ''}
                                                            type="password"
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={rePlainPassword}
                                                            onChange={(event) => {
                                                                this.setTextValue('rePlainPassword', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Számlázási adatok</h5>
                                                <p>Számlázási adatok, amire a számlát állítjuk ki.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'invoiceName' in this.state.formErrors}
                                                            fullWidth
                                                            label="Számlázái név"
                                                            name="invoiceName"
                                                            id="invoiceName"
                                                            value={this.state.profile.invoiceName || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={invoiceName}
                                                            onChange={(event) => {
                                                                this.setTextValue('invoiceName', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'invoiceAddress' in this.state.formErrors}
                                                            fullWidth
                                                            label="Számlázási cím"
                                                            name="invoiceAddress"
                                                            id="invoiceAddress"
                                                            value={this.state.profile.invoiceAddress || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={invoiceAddress}
                                                            onChange={(event) => {
                                                                this.setTextValue('invoiceAddress', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'taxnumber' in this.state.formErrors}
                                                            fullWidth
                                                            label="Adószám"
                                                            name="taxnumber"
                                                            id="taxnumber"
                                                            value={this.state.profile.taxnumber || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={taxnumber}
                                                            onChange={(event) => {
                                                                this.setTextValue('taxnumber', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Marketing</h5>
                                                <p>Marketing hozzájárulás</p>
                                                <Grid item xs={12}>
                                                    <Box display="flex" justifyContent="flex-start" mb={0} p={1}>
                                                        <Box pr={2}>
                                                            <Switch
                                                                checked={this.state.profile.marketing}
                                                                onChange={(event) => {
                                                                    this.setSwitchValue(event);
                                                                }}
                                                                name="marketing"
                                                                id="marketing"
                                                                color="primary"
                                                            />
                                                        </Box>
                                                        <Box pt={0}>
                                                            Hozzájárulok, hogy a tutibebiszitter.hu megkeressen egyedi
                                                            marketing ajánlatokkal, akciókkal,
                                                            promóciókkal. az adatokat nem adjuk ki harmadik félnek, és
                                                            bizalmasan kezeljük.
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Forrás</h5>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'source' in this.state.formErrors}
                                                            fullWidth
                                                            label="Honnan hallottál rólunk?"
                                                            name="source"
                                                            id="source"
                                                            value={this.state.profile.source || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={source}
                                                            onChange={(event) => {
                                                                this.setTextValue('source', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                    </ProfileDetails>


                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={2}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <p>Profilodat a továbbiakban az email cimed és jelszavad megadásával
                                                    bármikor módosíthatod.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'shortIntroduction' in this.state.formErrors}
                                                            fullWidth
                                                            label="Rövid bemutatkozás"
                                                            name="shortIntroduction"
                                                            id="shortIntroduction"
                                                            value={this.state.profile.shortIntroduction || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={shortIntroduction}
                                                            onChange={(event) => {
                                                                this.setTextValue('shortIntroduction', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'introduction' in this.state.formErrors}
                                                            fullWidth
                                                            label="Bemutatkozás"
                                                            name="introduction"
                                                            id="introduction"
                                                            value={this.state.profile.introduction || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            multiline={true}
                                                            rows={5}
                                                            helperText={introduction}
                                                            onChange={(event) => {
                                                                this.setTextValue('introduction', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'hourlyRate' in this.state.formErrors}
                                                            fullWidth
                                                            label="Óradíjam"
                                                            name="hourlyRate"
                                                            id="hourlyRate"
                                                            value={this.state.profile.hourlyRate || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            multiline={true}
                                                            rows={5}
                                                            helperText={hourlyRate}
                                                            // helperText={introduction}
                                                            onChange={(event) => {
                                                                this.setTextValue('hourlyRate', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </ProfileDetails>

                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={3}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <p>Amennyiben szeretnéd megosztani a profilodat, itt tudod megadni az
                                                    elérésüket. Kitöltésük nem
                                                    kötelező.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'web' in this.state.formErrors}
                                                            fullWidth
                                                            label="Weboldal"
                                                            name="web"
                                                            id="web"
                                                            value={this.state.profile.web || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={web}
                                                            onChange={(event) => {
                                                                this.setTextValue('web', event);
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'facebook' in this.state.formErrors}
                                                            fullWidth
                                                            label="Facebook"
                                                            name="facebook"
                                                            id="facebook"
                                                            value={this.state.profile.facebook || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={facebook}
                                                            onChange={(event) => {
                                                                this.setTextValue('facebook', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'instagram' in this.state.formErrors}
                                                            fullWidth
                                                            label="Instagram"
                                                            name="instagram"
                                                            id="instagram"
                                                            value={this.state.profile.instagram || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={instagram}
                                                            onChange={(event) => {
                                                                this.setTextValue('instagram', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>
                                    </ProfileDetails>

                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={4}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>

                                                <h3>Szolgáltatások</h3>

                                                <p>A profil ezekre a szolgáltatásokra fog megjelenni a találati
                                                    listákban.</p>

                                                {serviceErrors}

                                                <Grid container spacing={3}>
                                                    {services}
                                                </Grid>

                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>

                                                <h3>Kiegészítő szolgáltatások</h3>

                                                <p>Extra szolgáltatások, melyek kiegészítik a gyermek felügyeletet, és
                                                    előnyt jelentenek a megkereséseknél.</p>

                                                {additionalServiceErrors}

                                                <Grid container spacing={3}>
                                                    {additionalServices}
                                                </Grid>

                                            </Box>
                                        </Paper>

                                    </ProfileDetails>

                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={5}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>

                                                <p>Nyelvek, melyeken vállalsz bébiszitterkedést.</p>

                                                {languageErrors}

                                                <Grid container spacing={3}>
                                                    {languages}
                                                </Grid>

                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>

                                                <p>Itt megadhatod, legfeljebb mekkora csoportot vállalsz egyszerre.</p>

                                                {groupsErrors}

                                                <Grid container spacing={3}>
                                                    {groups}
                                                </Grid>

                                            </Box>
                                        </Paper>

                                    </ProfileDetails>


                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={6}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>

                                                <p>Azok a területek, amikre a profil megjelenik a találati listákban.
                                                    Érdemes minden olyan várost / kerületet
                                                    megadni,
                                                    ahol elérhető.</p>

                                                {placesErrors}

                                                <Grid container spacing={3}>
                                                    {places}
                                                </Grid>

                                            </Box>
                                        </Paper>

                                    </ProfileDetails>

                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={7}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">

                                            <Box p={3} mb={3}>

                                                <h5>Kiemelések</h5>

                                                <p>Kiemelések segítségével a profil a találati listában megkülönböztett
                                                    módon jelenik meg, ami előnyt és több
                                                    megkeresést biztosít a nem
                                                    kiemelt
                                                    tagokkal szemben. Az új tagok egy ideig automatikusan kiemeltként
                                                    ("Új tag") jelennek meg, a későbbiekben
                                                    lehetséges további kiemelést
                                                    igénybe venni.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                            <DatePicker
                                                                variant="outlined"
                                                                error={'newMemberSign' in this.state.formErrors}
                                                                id="newMemberSign"
                                                                name="newMemberSign"
                                                                label="Új tagként megjelölve"
                                                                views={['year', 'month', 'day']}
                                                                inputFormat="yyyy.MM.DD"
                                                                placeholderText="éééé.hh.nn"
                                                                mask="____.__.__"
                                                                value={this.state.profile.newMemberSign || null}
                                                                helperText={newMemberSign}
                                                                onChange={(newValue) => {
                                                                    this.setDateValue('newMemberSign', newValue);
                                                                }}
                                                                renderInput={(params) => <TextField {...params}
                                                                                                    helperText="Eddig a találati listában kiemelten, 'ÚJ' megjelöléssel jelenik meg."/>}
                                                            />
                                                        </LocalizationProvider>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                            <DatePicker
                                                                variant="outlined"
                                                                error={'highlighted' in this.state.formErrors}
                                                                id="highlighted"
                                                                name="highlighted"
                                                                label="Kiemelés"
                                                                views={['year', 'month', 'day']}
                                                                inputFormat="yyyy.MM.DD"
                                                                placeholderText="éééé.hh.nn"
                                                                mask="____.__.__"
                                                                value={this.state.profile.highlighted || null}
                                                                helperText={highlighted}
                                                                onChange={(newValue) => {
                                                                    this.setDateValue('highlighted', newValue);
                                                                }}
                                                                renderInput={(params) => <TextField {...params}
                                                                                                    helperText="Eddig a találati lista elején, az elős találatok között, kiemelten jelenik meg."/>}
                                                            />
                                                        </LocalizationProvider>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">

                                            <Box p={3} mb={3}>

                                                <h5>Előre helyezés</h5>

                                                <p>Az előre helyezés lehetőségt biztosít, hogy a profil ismételten a
                                                    találati listák elejére kerül, mintha
                                                    frissen
                                                    regisztrált
                                                    volna. A listák elején lévő profilok több megkeresésre
                                                    számthatnak.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                            <DatePicker
                                                                readOnly
                                                                variant="outlined"
                                                                id="lastRenewed"
                                                                name="lastRenewed"
                                                                label="Utolsó megújítás"
                                                                views={['year', 'month', 'day']}
                                                                inputFormat="yyyy.MM.DD HH:mm:ss"
                                                                placeholderText="éééé.hh.nn"
                                                                mask="____.__.__"
                                                                value={this.state.profile.lastRenewed || null}
                                                                onChange={() => {
                                                                }}
                                                                renderInput={(params) => <TextField {...params}
                                                                                                    helperText="Ekkor megújult a tagság, a profil a találati lista elejére kerültél."/>}
                                                            />
                                                        </LocalizationProvider>
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <TextField
                                                            error={'renewAvailable' in this.state.formErrors}
                                                            fullWidth
                                                            label="Felhasználható"
                                                            name="renewAvaiable"
                                                            id="renewAvaiable"
                                                            value={this.state.profile.renewAvailable || 0}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={renewAvailable}
                                                            onChange={(event) => {
                                                                this.setTextValue('renewAvailable', event);
                                                            }}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <Button variant="contained" color="primary"
                                                                disabled={this.state.renewBtnDisabled} onClick={() => {
                                                            this.profileRenew()
                                                        }}>
                                                            <Box mr={1}>
                                                                <AutorenewIcon/>
                                                            </Box>
                                                            Előre helyezés most
                                                        </Button>
                                                    </Grid>

                                                </Grid>
                                            </Box>
                                        </Paper>

                                    </ProfileDetails>

                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={8}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">

                                            <Box p={3} mb={3}>

                                                <h5>Adatlap url (slug)</h5>

                                                <p>Adatlap közvetlen elérése.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'slug' in this.state.formErrors}
                                                            fullWidth
                                                            readOnly
                                                            label="Weboldal adatlap url"
                                                            name="slug"
                                                            id="slug"
                                                            value={this.state.profile.slug || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={slug}
                                                            onChange={(event) => {
                                                                this.setTextValue('slug', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                            <Box p={3} mb={3}>

                                                <h5>Bőngésző címsor név (title)</h5>

                                                <p>Böngésző címsávjában megjelenő név.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'title' in this.state.formErrors}
                                                            fullWidth
                                                            readOnly
                                                            label="Böngésző címsávjában megjelenő név."
                                                            name="title"
                                                            id="title"
                                                            value={this.state.profile.title || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={title}
                                                            onChange={(event) => {
                                                                this.setTextValue('title', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                            <Box p={3} mb={3}>

                                                <h5>Adatlapon megjelenő meta leírás</h5>

                                                <p>Az adatlapon megjelenő meta leírás nem jelenik meg az adatlapon, de a
                                                    keresőmotorok számára fontos információt tartalmaz.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'meta' in this.state.formErrors}
                                                            fullWidth
                                                            readOnly
                                                            label="Meta leírás."
                                                            name="meta"
                                                            id="meta"
                                                            value={this.state.profile.meta || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            helperText={meta}
                                                            onChange={(event) => {
                                                                this.setTextValue('meta', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>

                                        </Paper>

                                    </ProfileDetails>

                                    <ProfileDetails
                                        value={this.state.activeTab}
                                        index={9}>

                                        <Paper elevation={3} bgcolor="#f7f7f7">

                                            <Box p={3} mb={3}>

                                                <p>Profil képek kezelése. Csak húzd be a képeket a keretbe, és a
                                                    feltöltésük automatikusan megtörténik. Az
                                                    előnyös
                                                    képpel rendelkező
                                                    "bizalomgerjesztő" profilok több megkeresésre számíthatnak.</p>

                                                <Grid container spacing={5}>
                                                    <Grid item xs={12}>
                                                        <DropzoneArea name="images"
                                                                      onChange={(event) => this.onRegistrationFormItemChanged(event)}/>
                                                    </Grid>
                                                </Grid>

                                                <p>A feltöltött profilképek kezelése. Itt választható ki a kezdő kép
                                                    is.</p>
                                                <small>Cardok a már feltöltött képekről...</small>

                                            </Box>
                                        </Paper>
                                    </ProfileDetails>

                                </div>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            spacing={3}
                            direction="column"
                            alignItems="center"
                            pb={3}
                        >
                            <Grid item xs={12}>
                                <Box
                                    alignItems="center"
                                    display="flex"
                                    flexDirection="column">
                                    <Button variant="contained" color="primary" onClick={(event) => {
                                        this.onAdminProfileFormSubmit(event)
                                    }}>
                                        <Box mr={1}>
                                            <SaveIcon/>
                                        </Box>
                                        Adatok mentése
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Page>
            )
            ;
        }

        return (
            <Aux>
                {profile}
            </Aux>
        );
    }
}

export default withRouter(withStyles

(
    useStyles
)(
    Account
))
