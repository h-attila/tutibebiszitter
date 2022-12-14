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
        return ['Szem??lyes adatok', 'Bemutatkoz??s', 'Szolg??ltat??sok', 'Helysz??nek', 'Csomagok', 'K??pek'];
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
        console.log('???? file', e);
    }

    getStepContent(stepIndex) {
        // step 1
        const name = this.props.formErrors['name'] ? this.props.formErrors['name'] : 'Profilodon megjelen?? neved (*)';
        const address = this.props.formErrors['address'] ? this.props.formErrors['address'] : 'Pontos c??med, nem jelenik meg az adatlapon (*)';
        const phone = this.props.formErrors['phone'] ? this.props.formErrors['phone'] : 'Telefonsz??m, csak sz??mjegyek (*)';
        const pubAddress = this.props.formErrors['pubAddress'] ? this.props.formErrors['pubAddress'] : "Publikus, adatlapon megjelen?? 'c??med', ahol el??rhet?? vagy. Pl. 'Budapesten a belv??rosban', vagy 'Kecskem??ten ??s k??rny??k??n'. (*)";
        const username = this.props.formErrors['username'] ? this.props.formErrors['username'] : 'Egyben a felhaszn??l??neved is (*)';
        const plainPassword = this.props.formErrors['plainPassword'] ? this.props.formErrors['plainPassword'] : 'Ezzel a jelsz??val tudsz majd bejelentkezni. Legal??bb 6 karakter, tartalmaznia kell sz??mot, kis ??s nagybet??t is. (*)';
        const rePlainPassword = this.props.formErrors['plainPassword'] ? this.props.formErrors['plainPassword'] : 'Jelsz?? ism??tl??se (*)';
        // step 2
        const shortIntroduction = this.props.formErrors['shortIntroduction'] ? this.props.formErrors['shortIntroduction'] : 'R??vid bemutatkoz?? sz??veg, a tal??lati list??ban jelenik meg (*)';
        const introduction = this.props.formErrors['introduction'] ? this.props.formErrors['introduction'] : 'Profilodon megjelen?? r??szletes bemutatkoz?? sz??veg (*)';
        const web = this.props.formErrors['web'] ? this.props.formErrors['web'] : 'weboldalad c??me, pl. https://www.kovacspeter.hu';
        const facebook = this.props.formErrors['facebook'] ? this.props.formErrors['facebook'] : 'facebook profil el??rhet??s??g, pl. https://www.facebook.com/kovacs.peter';
        const instagram = this.props.formErrors['instagram'] ? this.props.formErrors['instagram'] : 'Instagram el??rhet??s??g, pl. https://www.instagram.com/kovacs.peter';
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
        let btnLabel = submitDisabled ? 'Adatok ment??se folyamatban...' : 'Jelentkez??s ment??se';

        switch (stepIndex) {
            case 0:
                return (
                    <Aux>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Szem??lyes adatok</h5>
                                <hr/>
                                <p>Alapadatok, ??s kapcsolattart??si adatok.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'name' in this.props.formErrors}
                                            className={classes.Font}
                                            fullWidth
                                            label="N??v"
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
                                            label="Post??z??si c??m"
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
                                            label="Telefonsz??m"
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
                                            label="Nyilv??nos c??m"
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
                                <h5>Bejelentkez??si adatok</h5>
                                <hr/>
                                <p>Profilod a tov??bbiakban az email c??med ??s jelszavad megad??s??val b??rmikor
                                    m??dos??that??.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'username' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="E-mail c??m (egyben a felhaszn??l?? n??v is)"
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
                                            label="Bejelentkez??si jelsz??"
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
                                            label="Jelsz?? ism??t"
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
                        <small>*: a csillaggal megjell??lt mez??k kit??lt??se k??telez??.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            k??vetkez??
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
                                <h5>C??msor</h5>
                                <hr/>
                                <p>Figyelemfelkelt?? c??msor. Megjelenik a tal??lati list??ban a neved mellett, ??s az
                                    adatlapodon egyar??nt.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'label' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="C??msor"
                                            name="label"
                                            id="label"
                                            value={this.state.formData.label || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="pl. Gyermekszeret?? b??biszitter t??bb ??ves gyakorlattal. (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Bemutatkoz??s</h5>
                                <hr/>
                                <p>R??vid bemutatkoz?? sz??veg a tal??lati list??ban jelenik meg. T??rekedj t??m??r, de
                                    figyelemfelkelt?? sz??veg megad??s??ra. A r??szletes
                                    bemutatkoz??st az adatlapod tartalmazza, ez hosszabb, r??szletesebb le??r??s.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'shortIntroduction' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="R??vid bemutatkoz??s"
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
                                            label="Bemutatkoz??s"
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
                                            helperText="milyen (pl. h??ny ??v) tapasztalattal rendelkezel (*)"
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
                                <p>Add meg, els??sorban milyen gyermekeket szeretn??l v??llalni</p>
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
                                            helperText="pl. Legink??bb ??v??d??s kor??akkal tal??lom meg a hangot, de sz??vesen foglalkozom nagyobb gyermekekkel is. (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
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
                                            error={'preferredTime' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Ekkor ??rek r??"
                                            name="preferredTime"
                                            id="preferredTime"
                                            value={this.state.formData.preferredTime || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="pl. H??tk??znap napk??zben, de alkalmank??nt h??tv??g??n is (el??zetes egyeztet??s alapj??n). (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">

                            <Box p={3} mb={3}>
                                <h5>??rad??j</h5>
                                <hr/>
                                <p>Itt ??ll??thatod adhatod a d??jaz??soddal kapcsolatos r??szleteket.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            error={'hourlyRate' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="??rad??jam"
                                            name="hourlyRate"
                                            id="hourlyRate"
                                            value={this.state.formData.hourlyRate || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="Els??sorban ??rad??j, de lehet, alkalmi vagy napid??j. Ak??r pontos ??sszeg, tartom??ny, ill. vagy csak nagys??grend, stb. (*)"
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>

                            </Box>
                        </Paper>

                        <Paper elevation={3} bgcolor="#f7f7f7">

                            <Box p={3} mb={3}>
                                <h5>K??z??ss??gi m??dia</h5>
                                <hr/>
                                <p>Amennyiben szeretn??d megosztani a k??z??ss??gi m??di??s profilodat, itt tudod megadni az
                                    el??r??s??ket.</p>
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

                        <small>*: a csillaggal megjell??lt mez??k kit??lt??se k??telez??.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="outlined" size="small" className={classes.Button}
                                                onClick={this.handlePrev}>
                                            el??z??
                                        </Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            k??vetkez??
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
                                        <h5>Szolg??ltat??sok</h5>
                                        <hr/>
                                        <p>V??laszd ki, milyen kor?? gyermekeket v??llalsz.</p>

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
                                        <h5>Besz??lt nyelv</h5>
                                        <hr/>
                                        <p>V??laszd ki, milyen nyelven v??llalsz b??biszitterked??st.</p>

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
                                        <h5>Kieg??sz??t?? szolg??ltat??sok</h5>
                                        <hr/>
                                        <p>Kieg??sz??t?? szolg??ltat??sok, melyeket egyedi megbesz??l??s alapj??n el tudsz
                                            v??gezni.
                                            V??laszd ki azokat, melyek igazak r??d.</p>

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
                                        <p>Kieg??sz??t?? szolg??ltat??sok, melyeket egyedi megbesz??l??s alapj??n el tudsz
                                            v??gezni.
                                            V??laszd ki azokat, melyek igazak r??d.</p>

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
                        <small>Legal??bb egy szolg??ltat??s, besz??lt nyelv ??s l??tsz??m v??laszt??sa k??telez??.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="outlined" size="small" className={classes.Button}
                                                onClick={this.handlePrev}>
                                            el??z??
                                        </Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            k??vetkez??
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
                                <h5>Helysz??nek</h5>
                                <hr/>
                                <p>A megadott helysz??neken fogsz megjelenni a tal??lati list??kban, t??bb helysz??n is
                                    kiv??laszthat??.</p>

                                <hr/>

                                {placeErrors}

                                <Grid container spacing={5}>
                                    <Grid item xs={12}>

                                        <SelectItem placeholder='Helysz??nek' options={this.state.places} isMulti={true}
                                                    change={(event) => this.onRegistrationFormSelectChanged('place', event)}/>

                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <small>Legal??bb egy helysz??n v??laszt??sa k??telez??.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="outlined" size="small" className={classes.Button}
                                                onClick={this.handlePrev}>
                                            el??z??
                                        </Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            k??vetkez??
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
                                <h5>D??jcsomagok</h5>
                                <hr/>
                                <p>D??jcsomag kiv??laszt??sa. Hosszabb id??tartam jobban meg??ri. D??jaink m??r egyetlen egy
                                    megkeres??s eset??n megt??r??lnek!</p>
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
                                <h5>Fizet??si m??dok</h5>
                                <hr/>
                                <p>V??laszd ki a szimpatikus fizet??si m??dot.</p>
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
                                <h5>Sz??ml??z??si adatok</h5>
                                <hr/>
                                <p>Add meg a sz??ml??z??si adataidat, amennyiben elt??r a megadott szem??lyes adataidt??l.</p>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'invoiceName' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Sz??ml??z??si n??v"
                                            name="invoiceName"
                                            id="invoiceName"
                                            value={this.state.formData.invoiceName}
                                            variant="outlined"
                                            size="small"
                                            helperText="A megadott c??mre ??ll??tjuk ki a sz??ml??t."
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            error={'invoiceAddress' in this.props.formErrors}
                                            fullWidth
                                            className={classes.Font}
                                            label="Sz??ml??z??si c??m"
                                            name="invoiceAddress"
                                            id="invoiceAddress"
                                            value={this.state.formData.invoiceAddress}
                                            variant="outlined"
                                            size="small"
                                            helperText="A megadott n??vre ??ll??tjuk ki a sz??ml??t."
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
                                            label="Ad??sz??m"
                                            name="taxnumber"
                                            id="taxnumber"
                                            value={this.state.formData.taxnumber}
                                            variant="outlined"
                                            size="small"
                                            helperText="Ad??sz??m, c??ges sz??mla eset??n sz??ks??ges mez??."
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Forr??s</h5>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            className={classes.Font}
                                            label="Honnan hallott??l r??lunk?"
                                            name="source"
                                            id="source"
                                            value={this.state.formData.source || ''}
                                            variant="outlined"
                                            size="small"
                                            helperText="Nagy seg??ts??g r??sz??nkre, ha megosztod, hogy honnan hallott??l r??lunk."
                                            onChange={(event) => this.onRegistrationFormItemChanged(event)}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Paper>
                        <Paper elevation={3} bgcolor="#f7f7f7">
                            <Box p={3} mb={3}>
                                <h5>Marketing hozz??j??rul??s</h5>
                                <hr/>
                                <p>Nem k??ld??nk spam-et. Viszont folyamatosan azon dolgozunk, hogy sikeresebb b??biszitter
                                    l??gy. Ha ezzel kapcsolatban sz??vesen
                                    fogadsz megkeres??st t??l??nk, enged??lyezd a hozz??j??rul??st (k??s??bb b??rmikor
                                    visszavonhat??).</p>
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
                                            Szeretn??k elektronikus h??rlevelet kapni a TUTI b??biszitter-k??zvet??t??t??l,
                                            amelyben hasznos inform??ci??kat kapok az
                                            akci??kkal, munkalehet??s??gekkel ??s az ??jdons??gokkal kapcsolatban. ??gy pl. ha
                                            valaki k??zvetlen??l minket keres meg,
                                            hogy b??biszittert szeretne tal??lni, arr??l is ??rtes??lni fogsz. Az adatokat
                                            nem adjuk ki harmadik f??lnek, ??s
                                            bizalmasan kezelj??k.
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
                                            Az Adatkezel??si t??j??koztat??t ??s az ??SZF-et elolvastam ??s elfogadom.(*)
                                        </Box>
                                    </Box>
                                </Grid>
                            </Box>
                        </Paper>
                        <small>*: a csillaggal megjell??lt mez??k kit??lt??se k??telez??.</small>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Box display="flex" justifyContent="center" mb={3}>
                                    <Box mx={1}>
                                        <Button variant="outlined" size="small" className={classes.Button}
                                                onClick={this.handlePrev}>
                                            el??z??
                                        </Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" size="small" className={classes.Button}
                                                onClick={this.handleNext}>
                                            k??vetkez??
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
                                <h5>Profilk??p felt??lt??se</h5>
                                <p>Tall??zd be a k??pet a felt??lt??shez. Egy darab profilk??p felt??lt??se lehets??ges
                                    legfeljebb 5Mbyte m??retben.</p>

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
                                                            Profilk??p kiv??laszt??sa
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
                                                            T??rl??s
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
                                                        Kiv??lasztva: {this.state.file?.name || 'nincs f??jl kiv??lasztva'}
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
                                                el??z??
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
                return 'Ismeretlen l??p??s';
        }
    }

    onRegistrationFormItemChanged(e, subKey = null) {

        console.log('???? change', e, subKey);

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

        console.log('???? props', this.props);
        console.log('???? state', this.state);

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