// noinspection JSAnnotator

import {Box, Container, Grid, MenuItem, Select} from '@material-ui/core';
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PersonSearchIcon from '@material-ui/icons/Autorenew';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import ChatIcon from "@material-ui/icons/Chat";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import EditIcon from '@material-ui/icons/Edit';
import FacebookIcon from "@material-ui/icons/Facebook";
import FavoriteIcon from '@material-ui/icons/Favorite';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LanguageIcon from '@material-ui/icons/Language';
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PersonIcon from "@material-ui/icons/Person";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import PlaceIcon from "@material-ui/icons/Place";
import SaveIcon from '@material-ui/icons/Save';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import Alert from "@material-ui/lab/Alert";
import {LocalizationProvider, DatePicker, DateTimePicker} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment'
import axios from "axios";
import moment from 'moment';
import React, {Component} from 'react';

// import ProfileDetailsGroup from './ProfileDetailsGroup';
import {withRouter} from "react-router";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import DropzoneArea from "../../../../../app/components/DropzoneArea/DropzoneArea";
import SelectItem from "../../../../../app/components/SearchForm/SelectItem/SelectItem";
import Spinner from '../../../../../app/components/UI/Spinner/Spinner';
import Aux from "../../../../../app/hoc/Aux";
import history from "../../../../../app/store/history/history";
import AuthService from '../../../AuthService';
import Page from '../../../components/Page';
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";


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
                'Hiba t??rt??nt!',
                'Hi??nyz?? felhaszn??l??i azonos??t??. K??rlek, jelentkezz be ??jra.',
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

        // kil??p, ha lej??rt
        if (AuthService.isTokenExpired()) {
            Swal.fire(
                'Lej??rt a munkamenet',
                'K??rlek, jelentkez be ??jra',
                'warning'
            )

            history.push('/bejelentkezes');
            window.location.reload();
        }

        // profil adatok lek??r??se
        axios
            .get('admin/api/profile/get-profile/' + uuid, {headers: AuthService.getAuthHeader()})
            .then(response => {
                response.data.regStart = response.data.regStart ? moment(response.data.regStart) : null;
                response.data.regEnd = response.data.regEnd ? moment(response.data.regEnd) : null;
                response.data.created = response.data.created ? moment(response.data.created) : null;
                response.data.lastUpdate = response.data.lastUpdate ? moment(response.data.lastUpdate) : null;
                response.data.newMemberSign = response.data.newMemberSign ? moment(response.data.newMemberSign) : null;
                response.data.highlighted = response.data.highlighted ? moment(response.data.highlighted) : null;

                // helyeket kicsit kozmetik??zni kell /entity ??rkezik, object kell/
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
                    'Hiba t??rt??nt',
                    'A profil adatok bet??lt??se nem siker??lt. K??rj??k, pr??b??ld meg ism??t.',
                    'warning'
                )
            });

        // szolg??ltat??sok lek??r??se
        axios
            .get('admin/api/list-items/additional-service/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({additionalServices: response.data});
            });

        // kieg. szolg??ltat??sok lek??r??se
        axios
            .get('admin/api/list-items/service/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({services: response.data});
            });

        // helyek lek??r??se
        axios
            .get('admin/api/list-items/place/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({places: response.data});
            });

        // fizet??si m??dok
        axios
            .get('admin/api/list-items/paymode/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({payModes: response.data});
            });

        // d??jcsomagok
        axios
            .get('admin/api/list-items/package/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({packages: response.data});
            });

        // nyelvek
        axios
            .get('admin/api/list-items/language/get-list/active', {headers: AuthService.getAuthHeader()})
            .then(response => {
                this.setState({languages: response.data});
            });

        // csoportok
        axios
            .get('admin/api/list-items/group/get-list/active', {headers: AuthService.getAuthHeader()})
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
            // t??r??l
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

        // nincsen kezdeti d??tum
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
                    'Hozz??ad??s sikeres',
                    'Az ??j lej??rati d??tum: <strong>' + regEnd.format('YYYY.MM.DD') + '</strong>',
                    'success'
                )
            }

            // van kezdeti d??tum - a kezdeti nem v??ltozik
        } else if (moment.isMoment(this.state.profile.regStart)) {

            let regStart = this.state.profile.regStart;

            // kor??bbi a kezdeti d??tum, a mai naphoz k??pest n??zz??k a lej??ratot.
            if (regStart.isSameOrBefore(moment())) {
                regStart = moment();
            }

            // ha nincsen v??ge d??tum, vagy a m??ltban van, akkor a kezdetihez adjuk hozz??
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
                        'Hozz??ad??s sikeres',
                        'Az ??j lej??rati d??tum: <strong>' + regEnd.format('YYYY.MM.DD') + '</strong>',
                        'success'
                    )
                }

                // van v??ge d??tum a j??v??ben
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
                        'Hozz??ad??s sikeres',
                        'Az ??j lej??rati d??tum: <strong>' + regEnd.format('YYYY.MM.DD') + '</strong>',
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
                'Lej??rt a munkamenet',
                'El??re helyez??s nem ind??that??, k??rlek, jelentkezz be ??jra.',
                'warning'
            )

            return;
        }

        if (!this.state.profile.renewAvailable || !parseInt(this.state.profile.renewAvailable, 10) > 0) {
            MySwal.fire({
                title: 'El??re helyez??s nem lehets??ges',
                text: 'Nincsen felhaszn??lhat?? el??re helyez??s. K??rlek, vedd fel a kapcsolatot az ??gyf??lszolg??latunkkal.',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#6A1B9A',
                confirmButtonText: 'Bez??r??s',
                footer: '<a href="#">??gyf??lszolg??lat el??r??se</a>'       // todo: ??gyf??lszoli href
            });

            return;
        }

        MySwal.fire({
            title: 'Tags??g el??re helyez??se',
            text: 'Meger??s??t??s ut??n az adatlap a tal??lati list??k elej??n fog megjelenni.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6A1B9A',
            cancelButtonColor: '#d33',
            cancelButtonText: 'M??gsem',
            confirmButtonText: 'El??re helyez??s'
        }).then((result) => {
            if (result.isConfirmed) {

                this.setState({
                    renewBtnDisabled: true
                });

                // profil adatok lek??r??se
                axios
                    .put('admin/api/profile/renew-now/' + this.state.uuid, null, {headers: AuthService.getAuthHeader()})
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
                                'Sikeres el??re helyez??s',
                                'Az adatlap a tal??lati list??k ??lre ker??lt.',
                                'success'
                            );

                        } else {
                            Swal.fire(
                                'Hiba t??rt??nt',
                                response.data.message || 'Az el??re helyez??s nem siker??lt!',
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
                'Lej??rt a munkamenet',
                'Adatok ment??se nem ind??that??, k??rlek, jelentkezz be ??jra.',
                'warning'
            )

            return;
        }

        this.setState({formErrors: []});

        let profile = this.state.profile;

        MySwal.fire({
            title: 'M??dos??t??sok ment??se',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6A1B9A',
            cancelButtonColor: '#d33',
            cancelButtonText: 'M??gsem',
            confirmButtonText: 'Ment??s',
            showLoaderOnConfirm: true,
            backdrop: true,
            allowOutsideClick: () => !Swal.isLoading(),
            preConfirm: () => {

                return axios
                    .put('admin/api/profile/save/' + this.state.uuid, profile, {headers: AuthService.getAuthHeader()})
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

                    // helyeket kicsit kozmetik??zni kell /entity ??rkezik, object kell/
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
                        title: 'Sikeres ment??s',
                        text: 'A m??dos??t??sokat sikeresen elmentett??k.',
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
                        title: 'Hiba t??rt??nt',
                        text: errorMsg,
                    });

                    // } else {
                    //
                    //     MySwal.fire({
                    //         icon: 'error',
                    //         title: 'Hiba t??rt??nt...',
                    //         text: 'Hiba t??rt??nt a ment??s sor??n. K??rlek, ellen??rizd az adatokat, vagy vedd fel a kapcsolatot az ??gyf??lszolg??latunkkal.',
                    //         footer: '<a href="#">??gyf??lszolg??lat el??r??se</a>'       // todo: ??gyf??lszoli href
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
            //  Innen kezd??dik a be??gyazott blokk
            //  *********************************

            // szolg??ltat??sok
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

            // kieg??sz??t?? szolg??ltat??sok
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
                            <p>Kezd el g??plni a keresett v??ros nev??t, majd kattints a nev??re, hogy a list??ba ker??lj??n.
                                T??r??lni a list??b??l a piros "x" jelre
                                kattintva
                                lehet. T??bb helysz??nt is kiv??laszthatsz.</p>

                            <Grid container spacing={5}>
                                <Grid item xs={12}>

                                    <SelectItem placeholder='Helysz??nek' options={this.state.places} isMulti={true}
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

            const regStart = this.state.formErrors['regStart'] ? this.state.formErrors['regStart'] : 'Ett??l kezdve jelenik meg az adatlap publikusan.';
            const name = this.state.formErrors['name'] ? this.state.formErrors['name'] : 'Profilodon megjelen?? neved (*)';
            const address = this.state.formErrors['address'] ? this.state.formErrors['address'] : 'Pontos c??med, nem jelenik meg az adatlapon (*)';
            // const username = this.state.formErrors['username'] ? this.state.formErrors['username'] : 'E-mail c??med, mely a bejelentkez??si n??v is. (*)';
            const phone = this.state.formErrors['phone'] ? this.state.formErrors['phone'] : 'Telefonsz??m, csak sz??mjegyek (*)';
            const pubAddress = this.state.formErrors['pubAddress'] ? this.state.formErrors['pubAddress'] : "Publikus, adatlapon megjelen?? 'c??med', ahol el??rhet?? vagy. Pl. 'Budapesten a belv??rosban', vagy 'Kecskem??ten ??s k??rny??k??n'. (*)";
            const username = this.state.formErrors['username'] ? this.state.formErrors['username'] : 'Egyben a felhaszn??l??neved is (*)';
            const plainPassword = this.state.formErrors['plainPassword'] ? this.state.formErrors['plainPassword'] : 'Ezzel a jelsz??val tudsz majd bejelentkezni. Legal??bb 6 karakter, tartalmaznia kell sz??mot, kis ??s nagybet??t is. (*)';
            const rePlainPassword = this.state.formErrors['plainPassword'] ? this.state.formErrors['plainPassword'] : 'Jelsz?? ism??tl??se (*)';
            const shortIntroduction = this.state.formErrors['shortIntroduction'] ? this.state.formErrors['shortIntroduction'] : 'R??vid bemutatkoz?? sz??veg, a tal??lati list??ban jelenik meg. (*)';
            const introduction = this.state.formErrors['introduction'] ? this.state.formErrors['introduction'] : 'Profilodon megjelen?? r??szletes bemutatkoz?? sz??veg. (*)';
            const web = this.state.formErrors['web'] ? this.state.formErrors['web'] : 'weboldalad c??me, pl. https://www.kovacspeter.hu';
            const facebook = this.state.formErrors['facebook'] ? this.state.formErrors['facebook'] : 'facebook profil el??rhet??s??g, pl. https://www.facebook.com/kovacs.peter';
            const invoiceName = this.state.formErrors['invoiceName'] ? this.state.formErrors['invoiceName'] : 'Sz??ml??z??si n??v.';
            const invoiceAddress = this.state.formErrors['invoiceAddress'] ? this.state.formErrors['invoiceAddress'] : 'Sz??ml??z??si c??m.';
            const taxnumber = this.state.formErrors['taxnumber'] ? this.state.formErrors['taxnumber'] : 'Ad??sz??m, c??g eset??n k??telez??.';
            const instagram = this.state.formErrors['instagram'] ? this.state.formErrors['instagram'] : 'Instagram el??rhet??s??g, pl. https://www.instagram.com/kovacs.peter';
            const source = this.state.formErrors['source'] ? this.state.formErrors['source'] : 'Honnan hallott??l r??lunk?';
            const hourlyRate = this.state.formErrors['hourlyRate'] ? this.state.formErrors['hourlyRate'] : '??rad??jad. Lehet konkr??t ??sszeg, nagys??grend, r??vid le??r??s a d??jakkal kapcsolatban, stb.';
            const highlighted = this.state.formErrors['highlighted'] ? this.state.formErrors['highlighted'] : 'Tags??god eddig az ideig kiemeltk??nt jelenik meg az oldalon.';
            const renewAvailable = this.state.formErrors['renewAvailable'] ? this.state.formErrors['renewAvailable'] : 'Rendelkez??sre ??ll?? kiemel??sek sz??ma.';
            const slug = this.state.formErrors['slug'] ? this.state.formErrors['slug'] : 'Ezen a linken kereszt??l ??rhet?? el a szem??lyes profil oldalad.';
            const title = this.state.formErrors['title'] ? this.state.formErrors['title'] : 'B??ng??sz?? c??msorban megjelen?? sz??veg.';
            const meta = this.state.formErrors['meta'] ? this.state.formErrors['meta'] : 'Adatlapon megjelen?? meta le??r??s.';
            const newMemberSign = this.state.formErrors['newMemberSign'] ? this.state.formErrors['newMemberSign'] : 'Eddig a d??tumig az adatlapod kiemelten, "??J" megjel??l??ssel jelenik meg.';
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
                <Page className={classes.root} title={this.state.profile.name + " - TutiB??biszitter.hu"}>
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
                                            <Tab label="??ttekint??s" icon={<PersonPinIcon/>} {...this.a11yProps(0)}
                                                 onClick={() => this.onTabClick('0')}/>
                                            <Tab label="Szem??lyes adatok" icon={<PersonIcon/>} {...this.a11yProps(1)}
                                                 onClick={() => this.onTabClick('1')}/>
                                            <Tab label="Bemutatkoz??s" icon={<ChatIcon/>} {...this.a11yProps(2)}
                                                 onClick={() => this.onTabClick('2')}/>
                                            <Tab label="K??z??ss??gi m??dia" icon={<FacebookIcon/>} {...this.a11yProps(3)}
                                                 onClick={() => this.onTabClick('3')}/>
                                            <Tab label="Szolg??ltat??sok" icon={<ChildCareIcon/>} {...this.a11yProps(4)}
                                                 onClick={() => this.onTabClick('4')}/>
                                            <Tab label="Nyelvek, csoportok"
                                                 icon={<LanguageIcon/>} {...this.a11yProps(5)}
                                                 onClick={() => this.onTabClick('5')}/>
                                            <Tab label="Helysz??nek" icon={<PlaceIcon/>} {...this.a11yProps(6)}
                                                 onClick={() => this.onTabClick('6')}/>
                                            <Tab label="Kiemel??sek" icon={<LoyaltyIcon/>} {...this.a11yProps(7)}
                                                 onClick={() => this.onTabClick('7')}/>
                                            <Tab label="SEO" icon={<PersonSearchIcon/>} {...this.a11yProps(8)}
                                                 onClick={() => this.onTabClick('8')}/>
                                            <Tab label="Gal??ria" icon={<PhotoCameraIcon/>} {...this.a11yProps(9)}
                                                 onClick={() => this.onTabClick('9')}/>
                                            {/*<Tab label="El??zm??nyek" icon={<RestoreIcon/>} {...this.a11yProps(10)} onClick={() => this.onTabClick('10')}/>*/}
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
                                                            <h5>Legfontosabb d??tumok</h5>
                                                            <p>Regisztr??ci??val kapcsolatos legfontosabb adatok.</p>

                                                            <Grid container spacing={3}>
                                                                <Grid item xs={6}>

                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DatePicker
                                                                            variant="outlined"
                                                                            error={'regStart' in this.state.formErrors}
                                                                            id="regStart"
                                                                            name="regStart"
                                                                            label="Akt??v tags??g kezdete"
                                                                            views={['year', 'month', 'day']}
                                                                            inputFormat="yyyy.MM.DD"
                                                                            placeholderText="????????.hh.nn"
                                                                            mask="____.__.__"
                                                                            value={this.state.profile.regStart || null}
                                                                            onChange={(newValue) => {
                                                                                this.setDateValue('regStart', newValue);
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params}
                                                                                           helperText="Megjelen??s kezdeti d??tuma."/>}
                                                                        />
                                                                    </LocalizationProvider>
                                                                </Grid>

                                                                <Grid item xs={6}>
                                                                    <LocalizationProvider dateAdapter={AdapterMoment}>
                                                                        <DatePicker
                                                                            variant="outlined"
                                                                            id="regEnd"
                                                                            name="regEnd"
                                                                            label="Akt??v tags??g v??ge"
                                                                            views={['year', 'month', 'day']}
                                                                            inputFormat="yyyy.MM.DD"
                                                                            placeholder="????????.hh.nn"
                                                                            mask="____.__.__"
                                                                            value={regEnd || null}
                                                                            onChange={(newValue) => {
                                                                                this.setDateValue('regEnd', newValue);
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params}
                                                                                           helperText="Eddig jelenik meg az adatlap nyilv??nosan."/>}
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
                                                                            label="Jelentkez??s d??tuma"
                                                                            views={['year', 'month', 'day']}
                                                                            inputFormat="yyyy.MM.DD HH:mm:ss"
                                                                            value={this.state.profile.created}
                                                                            onChange={() => {
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params}
                                                                                           helperText="Regisztr??ci?? d??tuma."/>}
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
                                                                            label="Utols?? m??dos??t??s"
                                                                            views={['year', 'month', 'day']}
                                                                            inputFormat="yyyy.MM.DD HH:mm:ss"
                                                                            value={this.state.profile.lastUpdate}
                                                                            onChange={() => {
                                                                            }}
                                                                            renderInput={(params) =>
                                                                                <TextField {...params}
                                                                                           helperText="Utols?? adatm??dos??t??s ideje."/>}
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
                                                            <h5>D??jcsomag</h5>
                                                            <p>El??fizet??ses csomag adatai.</p>
                                                            <Grid container spacing={3}>
                                                                <Grid item xs={4}>
                                                                    {/*<InputLabel id="demo-simple-select-outlined-label">D??jcsomag</InputLabel>*/}
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
                                                                        hozz??ad
                                                                    </Button>
                                                                </Grid>

                                                                <Grid item xs={3}>
                                                                    <TextField
                                                                        // error={'pubAddress' in this.props.formErrors}
                                                                        readOnly
                                                                        fullWidth
                                                                        label="D??jcsomag napok"
                                                                        name="packageDays"
                                                                        id="packageDays"
                                                                        value={this.state.profile.package.days || ''}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        helperText="D??jcsomagban l??v?? napok sz??ma"
                                                                        onChange={() => {
                                                                        }}
                                                                    />
                                                                </Grid>

                                                                <Grid item xs={3}>
                                                                    <TextField
                                                                        // error={'pubAddress' in this.props.formErrors}
                                                                        readOnly
                                                                        fullWidth
                                                                        label="H??tral??v?? napok"
                                                                        name="remainingDays"
                                                                        id="remainingDays"
                                                                        value={remainingDays}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        helperText="H??tral??v?? napok sz??ma"
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
                                                            <h5>Tags??g aktiv??l??sa / inaktiv??l??sa</h5>
                                                            <p>Enged??lyez??s, tilt??s, sz??neteltet??s.</p>
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
                                                                        Tags??g j??v??hagy??sa. Bekapcsolat ??llapotban az
                                                                        adatlap nyilv??nosan megjelenik (az 'Akt??v
                                                                        tags??g' d??tumok be??ll??t??s??t??l f??gg??en).

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
                                                                        Megjelen??s enged??lyez??se vagy sz??neteltet??se.
                                                                        Kikapcsolt ??llapotban az adatlap nem
                                                                        jelenik meg ny??lv??nosan.
                                                                        Hasznos, ha ??tmenetileg sz??neteltetni kell a
                                                                        profilt pl. elfoglalts??g miatt. Fontos,
                                                                        hogy a sz??neteltet??s idej??vel nem hosszabodik
                                                                        meg a tags??gi id??.
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
                                                            label="N??v"
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
                                                            label="Post??z??si c??m"
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
                                                            label="Telefonsz??m"
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
                                                            label="Nyilv??nos c??m"
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
                                                <h5>Bejelentkez??si adatok</h5>
                                                <p>Weboldalon t??rt??n?? bejelentkez??shez. A megadott jelszavaknak -az
                                                    ellen??rz??s v??gett- egyezni??k kell.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <TextField
                                                            error={'username' in this.state.formErrors}
                                                            fullWidth
                                                            label="E-mail c??m"
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
                                                            label="Bejelentkez??si jelsz??"
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
                                                            label="Jelsz?? ism??t"
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
                                                <h5>Sz??ml??z??si adatok</h5>
                                                <p>Sz??ml??z??si adatok, amire a sz??ml??t ??ll??tjuk ki.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'invoiceName' in this.state.formErrors}
                                                            fullWidth
                                                            label="Sz??ml??z??i n??v"
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
                                                            label="Sz??ml??z??si c??m"
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
                                                            label="Ad??sz??m"
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
                                                <p>Marketing hozz??j??rul??s</p>
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
                                                            Hozz??j??rulok, hogy a tutibebiszitter.hu megkeressen egyedi
                                                            marketing aj??nlatokkal, akci??kkal,
                                                            prom??ci??kkal. az adatokat nem adjuk ki harmadik f??lnek, ??s
                                                            bizalmasan kezelj??k.
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Forr??s</h5>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'source' in this.state.formErrors}
                                                            fullWidth
                                                            label="Honnan hallott??l r??lunk?"
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
                                                <h5>C??msor</h5>
                                                <hr/>
                                                <p>Figyelemfelkelt?? c??msor. Megjelenik a tal??lati list??ban a neved mellett, ??s az adatlapodon egyar??nt.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'label' in this.state.formErrors}
                                                            fullWidth
                                                            label="C??msor"
                                                            name="label"
                                                            id="label"
                                                            value={this.state.profile.label || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            multiline={false}
                                                            helperText="pl. Gyermekszeret?? b??biszitter t??bb ??ves gyakorlattal. (*)"
                                                            onChange={(event) => {
                                                                this.setTextValue('hourlyRate', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Bemutatkoz??s</h5>
                                                <hr/>
                                                <p>R??vid bemutatkoz?? sz??veg a tal??lati list??ban jelenik meg. T??rekedj t??m??r, de figyelemfelkelt?? sz??veg megad??s??ra. A r??szletes
                                                    bemutatkoz??st az adatlapod tartalmazza, ez hosszabb, r??szletesebb le??r??s.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'shortIntroduction' in this.state.formErrors}
                                                            fullWidth
                                                            label="R??vid bemutatkoz??s"
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
                                                            label="Bemutatkoz??s"
                                                            name="introduction"
                                                            id="introduction"
                                                            value={this.state.profile.introduction || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            multiline={true}
                                                            helperText={introduction}
                                                            onChange={(event) => {
                                                                this.setTextValue('introduction', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Tapasztalat</h5>
                                                <hr/>
                                                <p>Itt adhatod meg, milyen tapasztalattal rendelkezel.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'experience' in this.state.formErrors}
                                                            fullWidth
                                                            label="Tapasztalat"
                                                            name="experience"
                                                            id="experience"
                                                            value={this.state.profile.experience || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            multiline={false}
                                                            helperText="pl. Gyermekszeret?? b??biszitter t??bb ??ves gyakorlattal. (*)"
                                                            onChange={(event) => {
                                                                this.setTextValue('hourlyRate', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Akiket keresek</h5>
                                                <hr/>
                                                <p>Add meg, els??sorban milyen gyermekeket szeretn??l v??llalni</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'lookingFor' in this.state.formErrors}
                                                            fullWidth
                                                            label="Tapasztalat"
                                                            name="lookingFor"
                                                            id="lookingFor"
                                                            value={this.state.profile.lookingFor || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            multiline={false}
                                                            helperText="pl. Legink??bb ??v??d??s kor??akkal tal??lom meg a hangot, de sz??vesen foglalkozom nagyobb gyermekekkel is. (*)"
                                                            onChange={(event) => {
                                                                this.setTextValue('lookingFor', event);
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>??rad??jam</h5>
                                                <hr/>
                                                <p>Itt ??ll??thatod adhatod a d??jaz??soddal kapcsolatos r??szleteket.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'hourlyRate' in this.state.formErrors}
                                                            fullWidth
                                                            label="??rad??jam"
                                                            name="hourlyRate"
                                                            id="hourlyRate"
                                                            value={this.state.profile.hourlyRate || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            multiline={false}
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

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>
                                                <h5>Ekkor ??rek r??</h5>
                                                <hr/>
                                                <p>Add meg, els??sorban milyen id??beoszt??s szerint v??llalsz gyermekfel??gyeletet.</p>
                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'preferredTime' in this.state.formErrors}
                                                            fullWidth
                                                            label="Ekkor ??rek r??"
                                                            name="preferredTime"
                                                            id="preferredTime"
                                                            value={this.state.profile.preferredTime || ''}
                                                            variant="outlined"
                                                            size="small"
                                                            multiline={false}
                                                            helperText="pl. H??tk??znap napk??zben, de alkalmank??nt h??tv??g??n is (el??zetes egyeztet??s alapj??n). (*)"
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
                                                <p>Amennyiben szeretn??d megosztani a profilodat, itt tudod megadni az
                                                    el??r??s??ket. Kit??lt??s??k nem
                                                    k??telez??.</p>
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

                                                <h3>Szolg??ltat??sok</h3>

                                                <p>A profil ezekre a szolg??ltat??sokra fog megjelenni a tal??lati
                                                    list??kban.</p>

                                                {serviceErrors}

                                                <Grid container spacing={3}>
                                                    {services}
                                                </Grid>

                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>

                                                <h3>Kieg??sz??t?? szolg??ltat??sok</h3>

                                                <p>Extra szolg??ltat??sok, melyek kieg??sz??tik a gyermek fel??gyeletet, ??s
                                                    el??nyt jelentenek a megkeres??sekn??l.</p>

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

                                                <p>Nyelvek, melyeken v??llalsz b??biszitterked??st.</p>

                                                {languageErrors}

                                                <Grid container spacing={3}>
                                                    {languages}
                                                </Grid>

                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">
                                            <Box p={3} mb={3}>

                                                <p>Itt megadhatod, legfeljebb mekkora csoportot v??llalsz egyszerre.</p>

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

                                                <p>Azok a ter??letek, amikre a profil megjelenik a tal??lati list??kban.
                                                    ??rdemes minden olyan v??rost / ker??letet
                                                    megadni,
                                                    ahol el??rhet??.</p>

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

                                                <h5>Kiemel??sek</h5>

                                                <p>Kiemel??sek seg??ts??g??vel a profil a tal??lati list??ban megk??l??nb??ztett
                                                    m??don jelenik meg, ami el??nyt ??s t??bb
                                                    megkeres??st biztos??t a nem
                                                    kiemelt
                                                    tagokkal szemben. Az ??j tagok egy ideig automatikusan kiemeltk??nt
                                                    ("??j tag") jelennek meg, a k??s??bbiekben
                                                    lehets??ges tov??bbi kiemel??st
                                                    ig??nybe venni.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                            <DatePicker
                                                                variant="outlined"
                                                                error={'newMemberSign' in this.state.formErrors}
                                                                id="newMemberSign"
                                                                name="newMemberSign"
                                                                label="??j tagk??nt megjel??lve"
                                                                views={['year', 'month', 'day']}
                                                                inputFormat="yyyy.MM.DD"
                                                                placeholderText="????????.hh.nn"
                                                                mask="____.__.__"
                                                                value={this.state.profile.newMemberSign || null}
                                                                helperText={newMemberSign}
                                                                onChange={(newValue) => {
                                                                    this.setDateValue('newMemberSign', newValue);
                                                                }}
                                                                renderInput={(params) => <TextField {...params}
                                                                                                    helperText="Eddig a tal??lati list??ban kiemelten, '??J' megjel??l??ssel jelenik meg."/>}
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
                                                                label="Kiemel??s"
                                                                views={['year', 'month', 'day']}
                                                                inputFormat="yyyy.MM.DD"
                                                                placeholderText="????????.hh.nn"
                                                                mask="____.__.__"
                                                                value={this.state.profile.highlighted || null}
                                                                helperText={highlighted}
                                                                onChange={(newValue) => {
                                                                    this.setDateValue('highlighted', newValue);
                                                                }}
                                                                renderInput={(params) => <TextField {...params}
                                                                                                    helperText="Eddig a tal??lati lista elej??n, az el??s tal??latok k??z??tt, kiemelten jelenik meg."/>}
                                                            />
                                                        </LocalizationProvider>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Paper>

                                        <Paper elevation={3} bgcolor="#f7f7f7">

                                            <Box p={3} mb={3}>

                                                <h5>El??re helyez??s</h5>

                                                <p>Az el??re helyez??s lehet??s??gt biztos??t, hogy a profil ism??telten a
                                                    tal??lati list??k elej??re ker??l, mintha
                                                    frissen
                                                    regisztr??lt
                                                    volna. A list??k elej??n l??v?? profilok t??bb megkeres??sre
                                                    sz??mthatnak.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={6}>
                                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                                            <DatePicker
                                                                readOnly
                                                                variant="outlined"
                                                                id="lastRenewed"
                                                                name="lastRenewed"
                                                                label="Utols?? meg??j??t??s"
                                                                views={['year', 'month', 'day']}
                                                                inputFormat="yyyy.MM.DD HH:mm:ss"
                                                                placeholderText="????????.hh.nn"
                                                                mask="____.__.__"
                                                                value={this.state.profile.lastRenewed || null}
                                                                onChange={() => {
                                                                }}
                                                                renderInput={(params) => <TextField {...params}
                                                                                                    helperText="Ekkor meg??jult a tags??g, a profil a tal??lati lista elej??re ker??lt??l."/>}
                                                            />
                                                        </LocalizationProvider>
                                                    </Grid>

                                                    <Grid item xs={3}>
                                                        <TextField
                                                            error={'renewAvailable' in this.state.formErrors}
                                                            fullWidth
                                                            label="Felhaszn??lhat??"
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
                                                            El??re helyez??s most
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

                                                <p>Adatlap k??zvetlen el??r??se.</p>

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

                                                <h5>B??ng??sz?? c??msor n??v (title)</h5>

                                                <p>B??ng??sz?? c??ms??vj??ban megjelen?? n??v.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'title' in this.state.formErrors}
                                                            fullWidth
                                                            readOnly
                                                            label="B??ng??sz?? c??ms??vj??ban megjelen?? n??v."
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

                                                <h5>Adatlapon megjelen?? meta le??r??s</h5>

                                                <p>Az adatlapon megjelen?? meta le??r??s nem jelenik meg az adatlapon, de a
                                                    keres??motorok sz??m??ra fontos inform??ci??t tartalmaz.</p>

                                                <Grid container spacing={3}>
                                                    <Grid item xs={12}>
                                                        <TextField
                                                            error={'meta' in this.state.formErrors}
                                                            fullWidth
                                                            readOnly
                                                            label="Meta le??r??s."
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

                                                <p>Profil k??pek kezel??se. Csak h??zd be a k??peket a keretbe, ??s a
                                                    felt??lt??s??k automatikusan megt??rt??nik. Az
                                                    el??ny??s
                                                    k??ppel rendelkez??
                                                    "bizalomgerjeszt??" profilok t??bb megkeres??sre sz??m??thatnak.</p>

                                                <Grid container spacing={5}>
                                                    <Grid item xs={12}>
                                                        <DropzoneArea name="images"
                                                                      onChange={(event) => this.onRegistrationFormItemChanged(event)}/>
                                                    </Grid>
                                                </Grid>

                                                <p>A felt??lt??tt profilk??pek kezel??se. Itt v??laszthat?? ki a kezd?? k??p
                                                    is.</p>
                                                <small>Cardok a m??r felt??lt??tt k??pekr??l...</small>

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
                                        Adatok ment??se
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
