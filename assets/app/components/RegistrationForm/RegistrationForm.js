import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import React, {Component} from 'react';
import {connect} from "react-redux";

import Aux from '../../hoc/Aux';
import * as actionCreators from "../../store/actions/actions";
import history from "../../store/history/history";
import SelectItem from '../SearchForm/SelectItem/SelectItem';
import Spinner from '../UI/Spinner/Spinner';
import classes from './RegistrationForm.scss';

class RegistrationForm extends Component {

    state = {
        steps: {
            active: 0,
            validSteps: null,
            invalidSteps: null
        },
        formData: {
            name: '',
            address: '',
            pubAddress: '',
            phone: '',
            username: '',
            plainPassword: '',
            rePlainPassword: '',
            shortIntroduction: '',
            introduction: '',
            web: '',
            facebook: '',
            instagram: '',
            package: '',
            payMode: '',
            language: {},
            service: {},
            additionalService: {},
            place: {},
            groups: {},
            invoiceName: '',
            invoiceAddress: '',
            taxNumber: '',
            source: '',
            marketing: '',
            aszf: ''
        },
        prices: null,
        payModes: null,
        packages: null,
        places: null,
        services: null,
        groups: null,
        languages: null,
        additionalService: null,
        file: null,
        path: null
    }

    // file upload
    handleFileUpload(e) {
        console.log('-- event');
        console.log(e);

        if (!e.target.files[0]) {
            return;
        }

        this.setState({
            ...this.state,
            file: e.target.files[0],
            path: URL.createObjectURL(e.target.files[0])
        });
    }

    removeUploadedFile() {
        this.setState({
            ...this.state,
            file: null,
            path: null
        });
    }

    // STEPPER
    getSteps() {
        return ['Személyes adatok', 'Bemutatkozás', 'Szolgáltatások', 'Helyszínek', 'Csomagok', 'Képek'];
    }

    totalSteps = () => {
        return this.getSteps().length;
    };
    isLastStep = () => {
        return this.state.steps.active === this.totalSteps() - 1;
    };
    setActiveStep = (newActiveStep) => {
        this.setState({steps: {active: newActiveStep}});
    }
    handleNext = () => {
        const newActiveStep = this.isLastStep() ? this.state.steps.active : this.state.steps.active + 1;
        this.setActiveStep(newActiveStep);
        window.scrollTo(0, 0);
    };
    handlePrev = () => {
        const newActiveStep = this.state.steps.active <= 0 ? 0 : this.state.steps.active - 1;
        this.setActiveStep(newActiveStep);
        window.scrollTo(0, 0);
    };

    handleDropChange(e) {
        console.log('»» file', e);
    }

    getStepContent(stepIndex) {
        // step 1
        const name = this.props.formErrors['name'] ? this.props.formErrors['name'] : 'Profilodon megjelenő neved (*)';
        const address = this.props.formErrors['address'] ? this.props.formErrors['address'] : 'Pontos címed, nem jelenik meg az adatlapon (*)';
        const phone = this.props.formErrors['phone'] ? this.props.formErrors['phone'] : 'Telefonszám, csak számjegyek (*)';
        const pubAddress = this.props.formErrors['pubAddress'] ? this.props.formErrors['pubAddress'] : "Publikus, adatlapon megjelenő 'címed', ahol elérhető vagy. Pl. 'Budapesten a belvárosban', vagy 'Kecskeméten és környékén'. (*)";
        const username = this.props.formErrors['username'] ? this.props.formErrors['username'] : 'Egyben a felhasználóneved is (*)';
        const plainPassword = this.props.formErrors['plainPassword'] ? this.props.formErrors['plainPassword'] : 'Ezzel a jelszóval tudsz majd bejelentkezni. Legalább 6 karakter, tartalmaznia kell számot, kis és nagybetűt is. (*)';
        const rePlainPassword = this.props.formErrors['plainPassword'] ? this.props.formErrors['plainPassword'] : 'Jelszó ismétlése (*)';
        // step 2
        const shortIntroduction = this.props.formErrors['shortIntroduction'] ? this.props.formErrors['shortIntroduction'] : 'Rövid bemutatkozó szöveg, a találati listában jelenik meg (*)';
        const introduction = this.props.formErrors['introduction'] ? this.props.formErrors['introduction'] : 'Profilodon megjelenő részletes bemutatkozó szöveg (*)';
        const web = this.props.formErrors['web'] ? this.props.formErrors['web'] : 'weboldalad címe, pl. https://www.kovacspeter.hu';
        const facebook = this.props.formErrors['facebook'] ? this.props.formErrors['facebook'] : 'facebook profil elérhetőség, pl. https://www.facebook.com/kovacs.peter';
        const instagram = this.props.formErrors['instagram'] ? this.props.formErrors['instagram'] : 'Instagram elérhetőség, pl. https://www.instagram.com/kovacs.peter';
        // step 3
        const serviceErrors = this.props.formErrors['service'] ? (
            <Alert severity="error">{this.props.formErrors['service']}</Alert>) : '';
        const languageErrors = this.props.formErrors['language'] ? (
            <Alert severity="error">{this.props.formErrors['language']}</Alert>) : '';
        const additionalServiceErrors = this.props.formErrors['additionalService'] ? (
            <Alert severity="error">{this.props.formErrors['additionalService']}</Alert>) : '';
        const groupsErrors = this.props.formErrors['groups'] ? (
            <Alert severity="error">{this.props.formErrors['groups']}</Alert>) : '';
        // step 4
        const placeErrors = this.props.formErrors['place'] ? (
            <Alert severity="error">{this.props.formErrors['place']}</Alert>) : '';
        // step 5
        const packageErrors = this.props.formErrors['package'] ? (
            <Alert severity="error">{this.props.formErrors['package']}</Alert>) : '';
        const payModeErrors = this.props.formErrors['payMode'] ? (
            <Alert severity="error">{this.props.formErrors['payMode']}</Alert>) : '';
        // step 6
        const imageErrors = this.props.formErrors['image'] ? (
            <Alert severity="error">{this.props.formErrors['image']}</Alert>) : '';

        let submitDisabled = this.props.submitDisabled;
        let btnLabel = submitDisabled ? 'Adatok mentése folyamatban...' : 'Jelentkezés mentése';

        switch (stepIndex) {
            case 0:
                return (
                    <Aux>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Személyes adatok</h5>
                                <hr/>
                                <p>Alapadatok, és kapcsolattartási adatok.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'name' in this.props.formErrors}
                                            className={classes.Font}
                                            fullWidth
                                            label="Név"
                                            name="name"
                                            id="name"
                                            value={this.state.formData.name}
                                            variant="outlined"
                                            size="small"
                                            helperText={name}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            error={'address' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Postázási cím"
                                            name="address"
                                            id="address"
                                            value={this.state.formData.address}
                                            variant="outlined"
                                            size="small"
                                            helperText={address}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'phone' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Telefonszám"
                                            name="phone"
                                            id="phone"
                                            value={this.state.formData.phone}
                                            variant="outlined"
                                            size="small"
                                            helperText={phone}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            error={'pubAddress' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Nyilvános cím"
                                            name="pubAddress"
                                            id="pubAddress"
                                            value={this.state.formData.pubAddress}
                                            variant="outlined"
                                            size="small"
                                            helperText={pubAddress}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Bejelentkezési adatok</h5>
                                <hr/>
                                <p>Profilod a továbbiakban az email címed és jelszavad megadásával bármikor
                                    módosítható.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'username' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="E-mail cím (egyben a felhasználó név is)"
                                            name="username"
                                            id="username"
                                            value={this.state.formData.username}
                                            variant="outlined"
                                            size="small"
                                            helperText={username}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'plainPassword' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Bejelentkezési jelszó"
                                            name="plainPassword"
                                            id="plainPassword"
                                            value={this.state.formData.plainPassword}
                                            type="password"
                                            variant="outlined"
                                            size="small"
                                            helperText={plainPassword}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            error={'plainPassword' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Jelszó ismét"
                                            name="rePlainPassword"
                                            id="rePlainPassword"
                                            value={this.state.formData.rePlainPassword}
                                            type="password"
                                            variant="outlined"
                                            size="small"
                                            helperText={rePlainPassword}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <small>*: a csillaggal megjellölt mezők kitöltése kötelező.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            következő
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Aux>
                );

            case 1:
                return (
                    <Aux>
                        <Paper elevation={3} bgcolor="#f7f7f7">

                            <Box p={3} mb={3}>
                                <h5>Címsor</h5>
                                <hr/>
                                <p>Figyelemfelkeltő címsor. Megjelenik a találati listában a neved mellett, és az
                                    adatlapodon egyaránt.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'label' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Címsor"
                                            name="label"
                                            id="label"
                                            value={this.state.formData.label || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="pl. Gyermekszerető bébiszitter több éves gyakorlattal. (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Bemutatkozás</h5>
                                <hr/>
                                <p>Rövid bemutatkozó szöveg a találati listában jelenik meg. Törekedj tömör, de
                                    figyelemfelkeltő szöveg megadására. A részletes
                                    bemutatkozást az adatlapod tartalmazza, ez hosszabb, részletesebb leírás.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'shortIntroduction' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Rövid bemutatkozás"
                                            name="shortIntroduction"
                                            id="shortIntroduction"
                                            value={this.state.formData.shortIntroduction}
                                            variant="outlined"
                                            size="small"
                                            helperText={shortIntroduction}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'introduction' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Bemutatkozás"
                                            name="introduction"
                                            id="introduction"
                                            value={this.state.formData.introduction}
                                            variant="outlined"
                                            size="small"
                                            multiline={true}
                                            rows={5}
                                            helperText={introduction}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
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
                                            error={'experience' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Tapasztalat"
                                            name="experience"
                                            id="experience"
                                            value={this.state.formData.experience || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="milyen (pl. hány év) tapasztalattal rendelkezel (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">

                            <Box p={3} mb={3}>
                                <h5>Akiket keresek</h5>
                                <hr/>
                                <p>Add meg, elsősorban milyen gyermekeket szeretnél vállalni</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'lookingFor' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Akiket keresek"
                                            name="lookingFor"
                                            id="lookingFor"
                                            value={this.state.formData.lookingFor || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="pl. Leginkább óvódás korúakkal találom meg a hangot, de szívesen foglalkozom nagyobb gyermekekkel is. (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">

                            <Box p={3} mb={3}>
                                <h5>Ekkor érek rá</h5>
                                <hr/>
                                <p>Add meg, elsősorban milyen időbeosztás szerint vállalsz gyermekfelügyeletet.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'preferredTime' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Ekkor érek rá"
                                            name="preferredTime"
                                            id="preferredTime"
                                            value={this.state.formData.preferredTime || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="pl. Hétköznap napközben, de alkalmanként hétvégén is (előzetes egyeztetés alapján). (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">

                            <Box p={3} mb={3}>
                                <h5>Óradíj</h5>
                                <hr/>
                                <p>Itt állíthatod adhatod a díjazásoddal kapcsolatos részleteket.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'hourlyRate' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Óradíjam"
                                            name="hourlyRate"
                                            id="hourlyRate"
                                            value={this.state.formData.hourlyRate || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="Elsősorban óradíj, de lehet, alkalmi vagy napidíj. Akár pontos összeg, tartomány, ill. vagy csak nagyságrend, stb. (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">

                            <Box p={3} mb={3}>
                                <h5>Közösségi média</h5>
                                <hr/>
                                <p>Amennyiben szeretnéd megosztani a közösségi médiás profilodat, itt tudod megadni az
                                    elérésüket.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'web' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Weboldal"
                                            name="web"
                                            id="web"
                                            value={this.state.formData.web}
                                            variant="outlined"
                                            size="small"
                                            helperText={web}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField
                                            error={'facebook' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Facebook"
                                            name="facebook"
                                            id="facebook"
                                            value={this.state.formData.facebook}
                                            variant="outlined"
                                            size="small"
                                            helperText={facebook}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'instagram' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Instagram"
                                            name="instagram"
                                            id="instagram"
                                            value={this.state.formData.instagram}
                                            variant="outlined"
                                            size="small"
                                            helperText={instagram}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>

                        <small>*: a csillaggal megjellölt mezők kitöltése kötelező.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="outlined" size="small" className={classes.Button}
                                                onClick={this.handlePrev}>
                                            előző
                                        </Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            következő
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button type="button" variant="contained" size="small"
                                                className={classes.Button} disabled={submitDisabled}
                                                onClick={() => this.props.registrationFormSubmit(this.state.formData, this.state.file)}>
                                            {btnLabel}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Aux>
                );

            case 2:
                // services
                if (!this.state.services) {
                    return (
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Spinner/>
                        </Paper>
                    );
                }

                const services = this.state.services.map(service => {
                    return (
                        <Grid item xs={12} key={service.id} m={0} p={0}>
                            <Box key={service.id} display="flex" justifyContent="flex-start" mb={0} p={1}>
                                <Box pr={3}>
                                    <Switch key={service.id}
                                            checked={this.state.formData.service[service.id] || false}
                                            color="primary"
                                            className={classes.Font}
                                            name={service.id.toString()}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event, 'service')}
                                    />
                                </Box>
                                <Box pt={1}>
                                    {service.label}
                                </Box>
                            </Box>
                        </Grid>
                    );
                });

                // languages
                if (!this.state.languages) {
                    return (
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Spinner/>
                        </Paper>
                    );
                }

                const languages = this.state.languages.map(language => {
                    return (
                        <Grid item xs={6} key={language.id} m={0} p={0}>
                            <Box key={language.id} display="flex" justifyContent="flex-start" mb={0} p={1}>
                                <Box pr={3}>
                                    <Switch key={language.id}
                                            checked={this.state.formData.language[language.id] || false}
                                            color="primary"
                                            className={classes.Font}
                                            name={language.id.toString()}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event, 'language')}
                                    />
                                </Box>
                                <Box pt={1}>
                                    {language.label}
                                </Box>
                            </Box>
                        </Grid>
                    );
                });

                // groups
                if (!this.state.groups) {
                    return (
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Spinner/>
                        </Paper>
                    );
                }

                const groups = this.state.groups.map(group => {
                    return (
                        <Grid item xs={6} key={group.id} m={0} p={0}>
                            <Box key={group.id} display="flex" justifyContent="flex-start" mb={0} p={1}>
                                <Box pr={3}>
                                    <Switch key={group.id}
                                            checked={this.state.formData.groups[group.id] || false}
                                            color="primary"
                                            className={classes.Font}
                                            name={group.id.toString()}
                                            inputProps={{'aria-label': 'primary checkbox'}}
                                            onChange={(event) => this.onRegistrationFormItemChanged(event, 'groups')}
                                    />
                                </Box>
                                <Box pt={1}>
                                    {group.label}
                                </Box>
                            </Box>
                        </Grid>
                    );
                });

                // additionalService
                if (!this.state.additionalService) {
                    return (
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Spinner/>
                        </Paper>
                    );
                }

                const additionalService = this.state.additionalService.map(additionalService => {
                    return (
                        <Grid item xs={6} key={additionalService.id} m={0} p={0}>
                            <Box display="flex" justifyContent="flex-start" mb={0} p={1}>
                                <Box pr={3}>
                                    <Switch
                                        checked={this.state.formData.additionalService[additionalService.id] || false}
                                        key={additionalService.id}
                                        className={classes.Font}
                                        color="primary"
                                        name={additionalService.id.toString()}
                                        inputProps={{'aria-label': 'primary checkbox'}}
                                        onChange={(event) => this.onRegistrationFormItemChanged(event, 'additionalService')}
                                    />
                                </Box>
                                <Box pt={1}>
                                    {additionalService.label}
                                </Box>
                            </Box>
                        </Grid>
                    );
                });

                return (
                    <Aux>
                        <Grid container spacing={3} alignItems="stretch">
                            <Grid item xs={6} style={{display: 'flex'}}>
                                <Paper elevation={3} bgcolor="#f7f7f7"
                                       style={{
                                           display: 'flex',
                                           justifyContent: 'space-between',
                                           flexDirection: 'column',
                                           width: '100%'
                                       }}>
                                    <Box p={3} mb={3}>
                                        <h5>Szolgáltatások</h5>
                                        <hr/>
                                        <p>Válaszd ki, milyen korú gyermekeket vállalsz.</p>

                                        <hr/>

                                        {serviceErrors}

                                        <Grid container spacing={5}>
                                            {/*<Grid item xs={12}>*/}

                                            {services}

                                            {/*</Grid>*/}
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>

                            <Grid item xs={6} style={{display: 'flex'}}>
                                <Paper elevation={3} bgcolor="#f7f7f7"
                                       style={{
                                           display: 'flex',
                                           justifyContent: 'space-between',
                                           flexDirection: 'column',
                                           width: '100%'
                                       }}>
                                    <Box p={3} mb={3}>
                                        <h5>Beszélt nyelv</h5>
                                        <hr/>
                                        <p>Válaszd ki, milyen nyelven vállalsz bébiszitterkedést.</p>

                                        <hr/>

                                        {languageErrors}

                                        <Grid container spacing={5}>
                                            {/*<Grid item xs={12}>*/}

                                            {languages}

                                            {/*</Grid>*/}
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper elevation={3} bgcolor="#f7f7f7">
                                    <Box p={3} mb={3}>
                                        <h5>Kiegészítő szolgáltatások</h5>
                                        <hr/>
                                        <p>Kiegészítő szolgáltatások, melyeket egyedi megbeszélés alapján el tudsz
                                            végezni.
                                            Válaszd ki azokat, melyek igazak rád.</p>

                                        <hr/>

                                        {additionalServiceErrors}

                                        <Grid container spacing={5}>
                                            {/*<Grid item xs={12}>*/}

                                            {additionalService}

                                            {/*</Grid>*/}
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>

                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper elevation={3} bgcolor="#f7f7f7">
                                    <Box p={3} mb={3}>
                                        <h5>Csoportok</h5>
                                        <hr/>
                                        <p>Kiegészítő szolgáltatások, melyeket egyedi megbeszélés alapján el tudsz
                                            végezni.
                                            Válaszd ki azokat, melyek igazak rád.</p>

                                        <hr/>

                                        {groupsErrors}

                                        <Grid container spacing={5}>
                                            {/*<Grid item xs={12}>*/}

                                            {groups}

                                            {/*</Grid>*/}
                                        </Grid>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                        <small>Legalább egy szolgáltatás, beszélt nyelv és létszám választása kötelező.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="outlined" size="small" className={classes.Button}
                                                onClick={this.handlePrev}>
                                            előző
                                        </Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            következő
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button type="button" variant="contained" size="small"
                                                className={classes.Button} disabled={submitDisabled}
                                                onClick={() => this.props.registrationFormSubmit(this.state.formData, this.state.file)}>
                                            {btnLabel}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Aux>
                );

            case 3:
                if (!this.props.places) {
                    return (
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Spinner/>
                        </Paper>
                    );
                }

                return (
                    <Aux>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Helyszínek</h5>
                                <hr/>
                                <p>A megadott helyszíneken fogsz megjelenni a találati listákban, több helyszín is
                                    kiválasztható.</p>

                                <hr/>

                                {placeErrors}

                                <Grid container spacing={5}>
                                    <Grid item xs={12}>

                                        <SelectItem placeholder='Helyszínek' options={this.state.places} isMulti={true}
                                                    change={(event) => this.onRegistrationFormSelectChanged('place', event)}/>

                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <small>Legalább egy helyszín választása kötelező.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="outlined" size="small" className={classes.Button}
                                                onClick={this.handlePrev}>
                                            előző
                                        </Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            következő
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button type="button" variant="contained" size="small"
                                                className={classes.Button} disabled={submitDisabled}
                                                onClick={() => this.props.registrationFormSubmit(this.state.formData, this.state.file)}>
                                            {btnLabel}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Aux>
                );

            case 4:
                let packages;
                let payModes;
                if (this.state.payModes) {
                    payModes = this.state.payModes.map(payMode => {
                        return <FormControlLabel value={payMode.id} key={payMode.id} name="payMode" control={<Radio/>}
                                                 label={payMode.label + " - " + payMode.description}/>
                    });
                } else {
                    payModes = <Spinner/>;
                }
                if (this.state.packages) {
                    packages = this.state.packages.map(p => {
                        return <FormControlLabel value={p.id} key={p.id} name="package" control={<Radio/>}
                                                 label={p.label + " - " + p.description}/>
                    });
                } else {
                    packages = <Spinner/>;
                }

                return (
                    <Aux>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Díjcsomagok</h5>
                                <hr/>
                                <p>Díjcsomag kiválasztása. Hosszabb időtartam jobban megéri. Díjaink már egyetlen egy
                                    megkeresés esetén megtérülnek!</p>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>

                                        <hr/>

                                        {packageErrors}

                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="package" name="package"
                                                        value={parseInt(this.state.formData.package)}
                                                        onChange={(event) => this.onRegistrationFormItemChanged(event)}>
                                                {packages}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Fizetési módok</h5>
                                <hr/>
                                <p>Válaszd ki a szimpatikus fizetési módot.</p>
                                <Grid container spacing={5}>
                                    <Grid item xs={12}>

                                        <hr/>

                                        {payModeErrors}

                                        <FormControl component="fieldset">
                                            <RadioGroup aria-label="payMode" name="payMode"
                                                        value={parseInt(this.state.formData.payMode)}
                                                        onChange={(event) => this.onRegistrationFormItemChanged(event)}>
                                                {payModes}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Számlázási adatok</h5>
                                <hr/>
                                <p>Add meg a számlázási adataidat, amennyiben eltér a megadott személyes adataidtól.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'invoiceName' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Számlázási név"
                                            name="invoiceName"
                                            id="invoiceName"
                                            value={this.state.formData.invoiceName}
                                            variant="outlined"
                                            size="small"
                                            helperText="A megadott címre állítjuk ki a számlát."
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'invoiceAddress' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Számlázási cím"
                                            name="invoiceAddress"
                                            id="invoiceAddress"
                                            value={this.state.formData.invoiceAddress}
                                            variant="outlined"
                                            size="small"
                                            helperText="A megadott névre állítjuk ki a számlát."
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'taxnumber' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Adószám"
                                            name="taxnumber"
                                            id="taxnumber"
                                            value={this.state.formData.taxnumber}
                                            variant="outlined"
                                            size="small"
                                            helperText="Adószám, céges számla esetén szükséges mező."
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Forrás</h5>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            className={classes.Font}
                                            label="Honnan hallottál rólunk?"
                                            name="source"
                                            id="source"
                                            value={this.state.formData.source || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="Nagy segítség részünkre, ha megosztod, hogy honnan hallottál rólunk."
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Marketing hozzájárulás</h5>
                                <hr/>
                                <p>Nem küldünk spam-et. Viszont folyamatosan azon dolgozunk, hogy sikeresebb bébiszitter
                                    légy. Ha ezzel kapcsolatban szívesen
                                    fogadsz megkeresést tőlünk, engedélyezd a hozzájárulást (később bármikor
                                    visszavonható).</p>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-start" mb={0} p={1}>
                                        <Box pr={2}>
                                            <Switch
                                                checked={this.state.formData.marketing || false}
                                                onChange={(event) => {
                                                    this.setSwitchValue(event);
                                                }}
                                                className={classes.Font}
                                                name="marketing"
                                                id="marketing"
                                                color="primary"
                                            />
                                        </Box>
                                        <Box pt={0}>
                                            Szeretnék elektronikus hírlevelet kapni a TUTI bébiszitter-közvetítőtől,
                                            amelyben hasznos információkat kapok az
                                            akciókkal, munkalehetőségekkel és az újdonságokkal kapcsolatban. Így pl. ha
                                            valaki közvetlenül minket keres meg,
                                            hogy bébiszittert szeretne találni, arról is értesülni fogsz. Az adatokat
                                            nem adjuk ki harmadik félnek, és
                                            bizalmasan kezeljük.
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box display="flex" justifyContent="flex-start" mb={0} p={1}>
                                        <Box pr={2}>
                                            <Switch
                                                checked={this.state.formData.aszf || false}
                                                onChange={(event) => {
                                                    this.setSwitchValue(event);
                                                }}
                                                className={classes.Font}
                                                name="aszf"
                                                id="aszf"
                                                color="primary"
                                            />
                                        </Box>
                                        <Box pt={0}>
                                            Az Adatkezelési tájékoztatót és az ÁSZF-et elolvastam és elfogadom.(*)
                                        </Box>
                                    </Box>
                                </Grid>
                            </Box>
                        </Paper>
                        <small>*: a csillaggal megjellölt mezők kitöltése kötelező.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="outlined" size="small" className={classes.Button}
                                                onClick={this.handlePrev}>
                                            előző
                                        </Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            következő
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button type="button" variant="contained" size="small"
                                                className={classes.Button} disabled={submitDisabled}
                                                onClick={() => this.props.registrationFormSubmit(this.state.formData, this.state.file)}>
                                            {btnLabel}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Aux>
                );

            case 5:
                return (
                    <Aux>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Profilkép feltöltése</h5>
                                <p>Tallózd be a képet a feltöltéshez. Egy darab profilkép feltöltése lehetséges
                                    legfeljebb 5Mbyte méretben.</p>

                                <hr/>

                                {imageErrors}

                                <Grid container spacing={5}>
                                    <Grid xs={12} item>
                                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                            <Card sx={{maxWidth: 400, width: '100%'}}>
                                                <CardActions>
                                                    <Box sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-around',
                                                        width: '100%'
                                                    }}>
                                                        <Button
                                                            component="label"
                                                            size="small"
                                                            variant="outlined"
                                                            startIcon={<CloudUploadIcon/>}
                                                            sx={{marginRight: "1rem"}}
                                                        >
                                                            Profilkép kiválasztása
                                                            <input type="file" accept="image/gif, image/png, image/jpeg"
                                                                   hidden
                                                                   onChange={(e) => this.handleFileUpload(e)}/>
                                                        </Button>
                                                        <Button
                                                            component="label"
                                                            size="small"
                                                            variant="outlined"
                                                            startIcon={<DeleteForeverIcon/>}
                                                            sx={{marginRight: "1rem"}}
                                                            onClick={() => this.removeUploadedFile()}
                                                        >
                                                            Törlés
                                                        </Button>
                                                    </Box>
                                                </CardActions>
                                                <CardMedia
                                                    component="img"
                                                    height="auto"
                                                    image={this.state.path || '/static/images/img_placeholder.png'}
                                                />
                                                <CardContent>
                                                    <small>
                                                        Kiválasztva: {this.state.file?.name || 'nincs fájl kiválasztva'}
                                                    </small>
                                                </CardContent>
                                            </Card>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center">
                                    <Box display="flex" justifyContent="center" mb={2}>
                                        <Box mx={1}>
                                            <Button variant="outlined" size="small" className={classes.Button}
                                                    onClick={this.handlePrev}>
                                                előző
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button type="button" variant="contained" size="small"
                                                className={classes.Button} disabled={submitDisabled}
                                                onClick={() => this.props.registrationFormSubmit(this.state.formData, this.state.file)}>
                                            {btnLabel}
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Aux>
                );

            default:
                return 'Ismeretlen lépés';
        }
    }

    onRegistrationFormItemChanged(e, subKey = null) {

        console.log('»» change', e, subKey);

        if (subKey) {
            let subData = {
                ...this.state.formData[subKey],
                [e.target.name]: e.target.checked
            };
            this.setState({
                formData: {
                    ...this.state.formData,
                    [subKey]: subData
                }
            });
        } else {
            this.setState({
                formData: {
                    ...this.state.formData,
                    [e.target.name]: e.target.value
                }
            });
        }
    }

    onRegistrationFormSelectChanged(target, value) {
        this.setState({
            formData: {
                ...this.state.formData,
                [target]: value
            }
        });
    }

    setSwitchValue(event) {
        this.setState({
            formData: {
                ...this.state.formData,
                [event.target.name]: event.target.checked
            }
        })
    }

    componentDidMount() {
        if (!this.state.packages) {
            axios
                .get('/api/registration/packages-init')
                .then(res => {
                        this.setState({packages: res.data})
                    }
                );
        }

        if (!this.state.services) {
            axios
                .get('/api/registration/services-init')
                .then(res => {
                        this.setState({services: res.data})
                    }
                );
        }

        if (!this.state.payModes) {
            axios
                .get('/api/registration/paymodes-init')
                .then(res => {
                        this.setState({payModes: res.data})
                    }
                );
        }

        if (!this.state.places) {
            axios
                .get('/api/registration/places-init')
                .then(res => {
                        this.setState({places: res.data})
                    }
                );
        }

        if (!this.state.additionalService) {
            axios
                .get('/api/registration/additional-services-init')
                .then(res => {
                        this.setState({additionalService: res.data})
                    }
                );
        }

        if (!this.state.services) {
            axios
                .get('/api/registration/services-init')
                .then(res => {
                        this.setState({services: res.data})
                    }
                );
        }

        if (!this.state.language) {
            axios
                .get('/api/registration/languages-init')
                .then(res => {
                        this.setState({languages: res.data})
                    }
                );
        }

        if (!this.state.groups) {
            axios
                .get('/api/registration/groups-init')
                .then(res => {
                        this.setState({groups: res.data})
                    }
                );
        }
        if (this.props.successRegistration) {
            history.push('/sikeres-jelentkezes');
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.successRegistration) {
            history.push('/sikeres-jelentkezes');
        }
    }

    render() {

        console.log('»» props', this.props);
        console.log('»» state', this.state);

        const stepErrors = [
            !!(this.props.formErrors['name'] || this.props.formErrors['address'] || this.props.formErrors['phone'] || this.props.formErrors['pubAddress'] || this.props.formErrors['username'] || this.props.formErrors['plainPassword']),
            !!(this.props.formErrors['shortIntroduction'] || this.props.formErrors['introduction']) || (this.props.formErrors['web'] || this.props.formErrors['facebook'] || this.props.formErrors['instagram']),
            !!(this.props.formErrors['service'] || this.props.formErrors['language'] || this.props.formErrors['additionalService'] || this.props.formErrors['groups']),
            !!(this.props.formErrors['place']),
            !!(this.props.formErrors['package'] || this.props.formErrors['payMode']),
            !!(this.props.formErrors['image']),
        ];

        return (
            <Aux>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Stepper activeStep={this.state.steps.active} alternativeLabel>
                            {this.getSteps().map((label, index) => (
                                <Step key={label} style={{cursor: 'pointer'}} onClick={() => this.setActiveStep(index)}>
                                    <StepLabel error={stepErrors[index]} style={{cursor: 'pointer'}}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                </Grid>

                {this.getStepContent(this.state.steps.active)}

            </Aux>
        )
    }
}

const mapStateToProps = state => {
        return {
            services: state.search.options.service,
            places: state.search.options.place,
            languages: state.search.options.language,
            packages: state.packages,
            submitDisabled: state.registration.submitDisabled,
            formErrors: state.registration.formErrors,
            successRegistration: state.registration.successRegistration
        }
    }
;

const mapDispatchToProps = dispatch => {
    return {
        packagesInit: () => dispatch(actionCreators.packagesInit()),
        // servicesInit: () => dispatch(actionCreators.searchFormInit()),
        registrationFormSubmit: (formData, file) => dispatch(actionCreators.registrationFormSubmit(formData, file))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);