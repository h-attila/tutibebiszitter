import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

// import Stepper from '@material-ui/core/Stepper';
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Button from '@material-ui/core/Button';
// import Aux from "../../../../../app/hoc/Aux";


// import React, {useState} from 'react';
// import clsx from 'clsx';
// import PropTypes from 'prop-types';
// import {Box, Button, Card, CardContent, Divider, Grid, makeStyles, TextField} from '@material-ui/core';
//
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import PersonIcon from '@material-ui/icons/Person';
// import SettingsIcon from '@material-ui/icons/Settings';
// import ChatIcon from '@material-ui/icons/Chat';
// import ChildCareIcon from '@material-ui/icons/ChildCare';
// import PlaceIcon from '@material-ui/icons/Place';
// import LoyaltyIcon from '@material-ui/icons/Loyalty';
// import ExtensionIcon from '@material-ui/icons/Extension';
// import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import Typography from '@material-ui/core/Typography';
//
// import Page from "../../../components/Page";
//


// function ProfileDetails(props) {
//     const {children, value, index, ...other} = props;
//
//     //todo: ez sokszor debugolódik, miért fut ilyen gyakran?
//     console.log('»» profiles cucc init', props);
//
//
//     return (
//         <div
//             role="ProfileDetails"
//             hidden={value !== index}
//             id={`scrollable-auto-ProfileDetails-${index}`}
//             aria-labelledby={`scrollable-auto-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography component={'div'}>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

ProfileDetails.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-ProfileDetails-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ProfileDetailsGroup(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log('»» this.props', props);

    // services
    // if (this.props.services.length === 0) {
    // if (false) {
    //     return (
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //             <Spinner/>
    //         </Paper>
    //     );
    // }

    // const services = this.props.services.map(service => {
    //     return (
    //         <Box key={service.id} display="flex" justifyContent="flex-start" mb={0} p={1}>
    //             <Box pr={3}>
    //                 <Switch key={service.id}
    //                         checked={this.state.formData.service[service.name] || false}
    //                         color="primary"
    //                         name={service.name}
    //                         inputProps={{'aria-label': 'primary checkbox'}}
    //                         onChange={(event) => this.onRegistrationFormItemChanged(event, 'service')}
    //                 />
    //             </Box>
    //             <Box pt={1}>
    //                 {service.label}
    //             </Box>
    //         </Box>
    //     );
    // });
    //
    // // szolgáltatások
    // let services = null;
    // if (!props.profile.services) {
    //
    //     services = (<Box mt={3}><Spinner/></Box>);
    //
    // } else {
    //
    //     services = props.profile.services.map(service => {
    //         let checked = false;
    //         // props.profile.profile.service.forEach(function(s){
    //         //     if (s.name === service.name) {
    //         //         checked = true;
    //         //     }
    //         // });
    //         return (
    //             <Grid item xs={6} key={service.id} m={0} p={0}>
    //                 <Box key={service.id} display="flex" justifyContent="flex-start" mb={0} p={1}>
    //                     <Box pr={3}>
    //                         <Switch key={service.id}
    //                                 checked={checked}
    //                                 color="primary"
    //                                 name={service.name}
    //                                 inputProps={{'aria-label': 'primary checkbox'}}
    //                                 onChange={(event) => this.onRegistrationFormItemChanged(event, 'service')}
    //                         />
    //                     </Box>
    //                     <Box pt={1}>
    //                         {service.label}
    //                     </Box>
    //                 </Box>
    //             </Grid>
    //         );
    //     });
    // }
    //
    // // kiegészítő szolgáltatások
    // let additionalService = null;
    // if (!props.profile.additionalService) {
    //
    //     additionalService = (<Box mt={3}><Spinner/></Box>);
    //
    // } else {
    //
    //     additionalService = props.profile.additionalService.map(additionalService => {
    //         let checked = false;
    //         props.profile.profile.additionalService.forEach(function(s){
    //             if (s.name === additionalService.name) {
    //                 checked = true;
    //             }
    //         });
    //         return (
    //             <Grid item xs={6} key={additionalService.id} m={0} p={0}>
    //                 <Box display="flex" justifyContent="flex-start" mb={0} p={1}>
    //                     <Box pr={3}>
    //                         <Switch
    //                             checked={checked}
    //                             key={additionalService.id}
    //                             color="primary"
    //                             name={additionalService.name}
    //                             inputProps={{'aria-label': 'primary checkbox'}}
    //                             onChange={(event) => this.onRegistrationFormItemChanged(event, 'additionalService')}
    //                         />
    //                     </Box>
    //                     <Box pt={1}>
    //                         {additionalService.label}
    //                     </Box>
    //                 </Box>
    //             </Grid>
    //         );
    //     });
    // }
    //
    // // helyek
    // let places = null;
    // if (!props.profile.places) {
    //
    //     places = (<Box mt={3}><Spinner/></Box>);
    //
    // } else {
    //
    //     places = (
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //             <Box p={3} mb={3} height={500}>
    //                 <p>Kezd el géplni a keresett város nevét, majd kattints a nevére, hogy a listába kerüljön. Törölni a listából a piros "x" jelre kattintva
    //                     lehet. Több helyszínt is kiválaszthatsz.</p>
    //
    //                 <Grid container spacing={5}>
    //                     <Grid item xs={12}>
    //
    //                         <SelectItem placeholder='Helyszínek' options={props.profile.places} isMulti={true}
    //                                     change={(event) => this.onRegistrationFormSelectChanged('place', event)}/>
    //
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //     );
    // }

    // return (
    // <div className={classes.root}>
    //
    //     <AppBar position="static" color="default">
    //         <Tabs
    //             value={value}
    //             onChange={handleChange}
    //             indicatorColor="primary"
    //             textColor="primary"
    //             variant="scrollable"
    //             scrollButtons="auto"
    //             aria-label="scrollable auto tabs example"
    //         >
    //
    //             <Tab label="Áttekintés" icon={<PersonPinIcon/>} {...a11yProps(0)} />
    //             <Tab label="Személyes adatok" icon={<PersonIcon/>} {...a11yProps(1)} />
    //             <Tab label="Bemutatkozás" icon={<ChatIcon/>} {...a11yProps(2)} />
    //             <Tab label="Közösségi média" icon={<FacebookIcon/>} {...a11yProps(3)} />
    //             <Tab label="Szolgáltatások" icon={<ChildCareIcon/>} {...a11yProps(4)} />
    //             <Tab label="Kieg. Szolg." icon={<ExtensionIcon/>} {...a11yProps(5)} />
    //             <Tab label="Helyszínek" icon={<PlaceIcon/>} {...a11yProps(6)} />
    //             <Tab label="Kiemelések" icon={<LoyaltyIcon/>} {...a11yProps(7)} />
    //             <Tab label="Galéria" icon={<PhotoCameraIcon/>} {...a11yProps(8)} />
    //             <Tab label="Előzmények" icon={<RestoreIcon/>} {...a11yProps(9)} />
    //         </Tabs>
    //     </AppBar>
    //
    //
    //     <ProfileDetails value={value} index={0}>
    //         <Container maxWidth="lg">
    //             <Grid
    //                 container
    //                 spacing={3}
    //             >
    //                 <Grid
    //                     item
    //                     lg={4}
    //                     md={6}
    //                     xs={12}
    //                 >
    //                     <Profile profileName={props.profile.profile.name} profileImage='/static/images/avatars/avatar_6.png'/>
    //                 </Grid>
    //                 <Grid
    //                     item
    //                     lg={8}
    //                     md={6}
    //                     xs={12}
    //                 >
    //                     <Paper elevation={3} bgcolor="#f7f7f7">
    //                         <Box p={3} mb={3}>
    //                             <h5>Legfontosabb dátumok</h5>
    //                             <p>Regisztrációval kapcsolatos legfontosabb adatok.</p>
    //
    //                             <Grid container spacing={3}>
    //                                 <Grid item xs={6}>
    //                                     <TextField
    //                                         // error={'name' in this.props.formErrors}
    //                                         fullWidth
    //                                         label="Aktív tagság kezdete"
    //                                         name="regStart"
    //                                         id="regStart"
    //                                         value={props.profile.profile.regStart}
    //                                         variant="outlined"
    //                                         size="small"
    //                                         helperText="Ettől kezdve jelenik meg az adatlap publikusan."
    //                                         // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                                     />
    //                                 </Grid>
    //
    //                                 <Grid item xs={6}>
    //                                     <TextField
    //                                         // error={'address' in this.props.formErrors}
    //                                         fullWidth
    //                                         label="Aktív tagság vége"
    //                                         name="regEnd"
    //                                         id="regEnd"
    //                                         value={props.profile.profile.regEnd}
    //                                         variant="outlined"
    //                                         size="small"
    //                                         helperText="Eddig jelenik meg aaz adatlap nyílvánosan."
    //                                         // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                                     />
    //                                 </Grid>
    //                             </Grid>
    //
    //                             <Grid container spacing={3}>
    //                                 <Grid item xs={6}>
    //                                     <TextField
    //                                         // error={'phone' in this.props.formErrors}
    //                                         fullWidth
    //                                         label="Jelentkezés dátuma"
    //                                         name="created"
    //                                         id="created"
    //                                         value={props.profile.profile.created}
    //                                         variant="outlined"
    //                                         size="small"
    //                                         helperText="Profil létrehozás ideje."
    //                                         // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                                     />
    //                                 </Grid>
    //
    //                                 <Grid item xs={6}>
    //                                     <TextField
    //                                         // error={'pubAddress' in this.props.formErrors}
    //                                         fullWidth
    //                                         label="Utolsó módosítás"
    //                                         name="lastUpdate"
    //                                         id="lastUpdate"
    //                                         value={props.profile.profile.lastUpdate}
    //                                         variant="outlined"
    //                                         size="small"
    //                                         helperText="Utolsó adatmódosítás ideje."
    //                                         // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                                     />
    //                                 </Grid>
    //                             </Grid>
    //                         </Box>
    //                     </Paper>
    //                 </Grid>
    //             </Grid>
    //
    //             <Grid container spacing={3}>
    //                 <Grid item xs={12}>
    //
    //                     <Paper elevation={3} bgcolor="#f7f7f7">
    //                         <Box p={3} mb={3}>
    //                             <h5>Tagság aktiválása / inaktiválása</h5>
    //                             <p>Engedélyezés, tiltás, szüneteltetés.</p>
    //                             <Grid container spacing={3}>
    //                                 <Grid item xs={12}>
    //                                     <FormControlLabel
    //                                         control={
    //                                             <Switch
    //                                                 checked="checked"
    //                                                 // onChange={handleChange}
    //                                                 name="enabled"
    //                                                 id="enabled"
    //                                                 color="primary"
    //                                             />
    //                                         }
    //                                         label="Tagság jóváhagyása. Bekapcsolat állapotban az adatlap nyilvánosan megjelenik (az 'Aktív tagság' dátumok beállításától függően)."
    //                                     />
    //                                 </Grid>
    //
    //                                 <Grid item xs={12}>
    //                                     <FormControlLabel
    //                                         control={
    //                                             <Switch
    //                                                 checked={props.profile.profile.active}
    //                                                 // onChange={handleChange}
    //                                                 name="active"
    //                                                 id="active"
    //                                                 color="primary"
    //                                             />
    //                                         }
    //                                         label="Megjelenés engedélyezése. Kikapcsolt állapotban az adatlap nem jelenik meg nyílvánosan. Hasznos, ha átmenetileg szüneteltetni kell a profilt pl. elfoglaltság miatt. Fontos, hogy a szüneteltetés idejével nem hosszabodik meg a tagsági idő."
    //                                     />
    //                                 </Grid>
    //
    //                             </Grid>
    //                         </Box>
    //                     </Paper>
    //                 </Grid>
    //             </Grid>
    //
    //             <Grid container spacing={3}>
    //                 <Grid item xs={12}>
    //
    //                     <Paper elevation={3} bgcolor="#f7f7f7">
    //                         <Box p={3} mb={3}>
    //                             <h5>Díjcsomag</h5>
    //                             <p>Előfizetéses csomag adatai.</p>
    //                             <Grid container spacing={3}>
    //                                 <Grid item xs={9}>
    //                                     <InputLabel id="demo-simple-select-outlined-label">Díjcsomag</InputLabel>
    //                                     <Select
    //                                         labelId="package"
    //                                         id="package"
    //                                         // value={age}
    //                                         onChange={handleChange}
    //                                         label="Age"
    //                                     >
    //                                         <MenuItem value="">
    //                                             <em>Nincs kiválasztva</em>
    //                                         </MenuItem>
    //                                         <MenuItem value={10}>Éves tagság</MenuItem>
    //                                         <MenuItem value={20}>Féléves tagság</MenuItem>
    //                                     </Select>
    //                                 </Grid>
    //
    //                                 <Grid item xs={3}>
    //                                     <TextField
    //                                         // error={'pubAddress' in this.props.formErrors}
    //                                         fullWidth
    //                                         label="Napok"
    //                                         name="packageDays"
    //                                         id="packageDays"
    //                                         value={props.profile.profile.package.days}
    //                                         variant="outlined"
    //                                         size="small"
    //                                         helperText="Díjcsomagban lévő napok száma"
    //                                         // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                                     />
    //                                 </Grid>
    //                             </Grid>
    //                         </Box>
    //                     </Paper>
    //                 </Grid>
    //             </Grid>
    //         </Container>
    //     </ProfileDetails>
    //
    //
    //     <ProfileDetails value={value} index={1}>
    //
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //             <Box p={3} mb={3}>
    //                 <h5>Alap adatok</h5>
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'name' in this.props.formErrors}
    //                             fullWidth
    //                             label="Név"
    //                             name="name"
    //                             id="name"
    //                             value={props.profile.profile.name}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Saját név, nem jelenik meg az adatlapon."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'address' in this.props.formErrors}
    //                             fullWidth
    //                             label="Postázási cím"
    //                             name="address"
    //                             id="address"
    //                             value={props.profile.profile.address}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Kapcsolattartáshoz, nem jelenik meg az adatlapon."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'phone' in this.props.formErrors}
    //                             fullWidth
    //                             label="Telefonszám"
    //                             name="phone"
    //                             id="phone"
    //                             value={props.profile.profile.phone}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Csak számjegyek."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'pubAddress' in this.props.formErrors}
    //                             fullWidth
    //                             label="Nyilvános cím"
    //                             name="pubAddress"
    //                             id="pubAddress"
    //                             value={props.profile.profile.pubAddress}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Nyílvános, az adatlapon megjelenő cím, pl. Budapest, Blaha Lujza tér környéke."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //             <Box p={3} mb={3}>
    //                 <h5>Bejelentkezési adatok</h5>
    //                 <p>Weboldalon történő bejelentkezéshez. A megadott jelszavaknak -az ellenőrzés végett- egyezniük kell.</p>
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'email' in this.props.formErrors}
    //                             fullWidth
    //                             label="E-mail cím"
    //                             name="email"
    //                             id="email"
    //                             value={props.profile.profile.email}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Egyben a profil adminisztrációs felület bejelentkezési jelszava is."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'plainPassword' in this.props.formErrors}
    //                             fullWidth
    //                             label="Bejelentkezési jelszó"
    //                             name="plainPassword"
    //                             id="plainPassword"
    //                             // value={props.profile.profile.lastUpdate}
    //                             type="password"
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Minimum 6 karakter hosszú, tartalmaznia kell legalább egy nagybetűt és számot"
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'plainPassword' in this.props.formErrors}
    //                             fullWidth
    //                             label="Jelszó ismét"
    //                             name="rePlainPassword"
    //                             id="rePlainPassword"
    //                             // value={this.state.formData.rePlainPassword}
    //                             type="password"
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Jelszó egyezés ellenőrzése."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //             <Box p={3} mb={3}>
    //                 <h5>Számlázási adatok</h5>
    //                 <p>Számlázási adatok, amire a számlát állítjuk ki.</p>
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={12}>
    //                         <TextField
    //                             // error={'shortIntroduction' in this.props.formErrors}
    //                             fullWidth
    //                             label="Számlázái név"
    //                             name="invoiceName"
    //                             id="invoiceName"
    //                             value={props.profile.profile.invoiceName}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Számlázási név, cégnév, vagy saját név, amire a számla kiálltásra kerül."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={12}>
    //                         <TextField
    //                             // error={'introduction' in this.props.formErrors}
    //                             fullWidth
    //                             label="Számlázási cím"
    //                             name="invoiceAddress"
    //                             id="invoiceAddress"
    //                             value={props.profile.profile.invoiceAddress}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Számlázási cím, számlához."
    //                             // helperText={introduction}
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //
    //     </ProfileDetails>
    //
    //
    //     <ProfileDetails value={value} index={2}>
    //
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //             <Box p={3} mb={3}>
    //                 <p>Profilodat a továbbiakban az email cimed és jelszavad megadásával bármikor módosíthatod.</p>
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={12}>
    //                         <TextField
    //                             // error={'shortIntroduction' in this.props.formErrors}
    //                             fullWidth
    //                             label="Rövid bemutatkozás"
    //                             name="shortIntroduction"
    //                             id="shortIntroduction"
    //                             value={props.profile.profile.shortIntroduction}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Találati listában jelenik meg, rövid, figyelemfelkeltő szöveg."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={12}>
    //                         <TextField
    //                             // error={'introduction' in this.props.formErrors}
    //                             fullWidth
    //                             label="Bemutatkozás"
    //                             name="introduction"
    //                             id="introduction"
    //                             value={props.profile.profile.introduction}
    //                             variant="outlined"
    //                             size="small"
    //                             multiline={true}
    //                             rows={5}
    //                             helperText="Adatlapon megjelenő részletes bemutatkozó szöveg."
    //                             // helperText={introduction}
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //     </ProfileDetails>
    //
    //     <ProfileDetails value={value} index={3}>
    //
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //             <Box p={3} mb={3}>
    //                 <p>Amennyiben szeretnéd megosztani a profilodat, itt tudod megadni az elérésüket. Kitöltésük nem kötelező.</p>
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'web' in this.props.formErrors}
    //                             fullWidth
    //                             label="Weboldal"
    //                             name="web"
    //                             id="web"
    //                             value={props.profile.profile.web}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Saját weboldal url, amennyiben van."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'facebook' in this.props.formErrors}
    //                             fullWidth
    //                             label="Facebook"
    //                             name="facebook"
    //                             id="facebook"
    //                             value={props.profile.profile.facebook}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Nyílvános facebook profil elérhetőség, pl. https://www.facebook.com/tutibebiszitter"
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'instagram' in this.props.formErrors}
    //                             fullWidth
    //                             label="Instagram"
    //                             name="instagram"
    //                             id="instagram"
    //                             value={props.profile.profile.instagram}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Nyilvános insta profil elérhetőség."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //     </ProfileDetails>
    //
    //     <ProfileDetails value={value} index={4}>
    //
    //         <p>A profil ezekre a szolgáltatásokra fog megjelenni a találati listákban.</p>
    //
    //         <Grid container spacing={3}>
    //             {services}
    //         </Grid>
    //
    //     </ProfileDetails>
    //
    //     <ProfileDetails value={value} index={5}>
    //
    //         <p>Extra szolgáltatások, melyek kiegészítik a gyermek felügyeletet, és előnyt jelentenek a megkereséseknél.</p>
    //
    //         <Grid container spacing={3}>
    //             {additionalService}
    //         </Grid>
    //
    //     </ProfileDetails>
    //
    //     <ProfileDetails value={value} index={6}>
    //
    //         <p>Azok a területek, amikre a profil megjelenik a találati listákban. Érdemes minden olyan várost / kerületet megadni, ahol elérhető.</p>
    //
    //         {places}
    //
    //     </ProfileDetails>
    //
    //     <ProfileDetails value={value} index={7}>
    //
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //
    //             <h5>Kiemelések</h5>
    //
    //             <p>Kiemelések segítségével a profil a találati listában megkülönböztett módon jelenik meg, ami előnyt és több megkeresést biztosít a nem
    //                 kiemelt
    //                 tagokkal szemben. Az új tagok egy ideig automatikusan kiemeltként ("Új tag") jelennek meg, a későbbiekben lehetséges további kiemelést
    //                 igénybe venni.</p>
    //
    //             <Box p={3} mb={3}>
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'email' in this.props.formErrors}
    //                             fullWidth
    //                             label="Új tagként megjelölve"
    //                             name="newSign"
    //                             id="newSign"
    //                             value={props.profile.profile.newMemberSign}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Eddig a találati listában kiemelten, 'ÚJ' megjelöléssel jelenik meg."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'plainPassword' in this.props.formErrors}
    //                             fullWidth
    //                             label="Kiemelés"
    //                             name="highLighted"
    //                             id="highLighted"
    //                             value={props.profile.profile.highlighted}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Eddig a találati lista elején, az elős találatok között, kiemelten jelenik meg."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //
    //             <h5>Előre helyezés</h5>
    //
    //             <p>Az előre helyezés lehetőségt biztosít, hogy a profil ismételten a találati listák elejére kerül, mintha frissen regisztrált
    //                 volna. A listák elején lévő profilok több megkeresésre számthatnak.</p>
    //
    //             <Box p={3} mb={3}>
    //
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={6}>
    //                         <TextField
    //                             // error={'email' in this.props.formErrors}
    //                             fullWidth
    //                             label="Utolsó megújítás"
    //                             name="lastRenewed"
    //                             id="lastRenewed"
    //                             value={props.profile.profile.lastRenewed}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Ekkor megújult a tagság, a profil a találati lista elejére került"
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //
    //                     <Grid item xs={3}>
    //                         <TextField
    //                             // error={'plainPassword' in this.props.formErrors}
    //                             fullWidth
    //                             label="Felhasználható"
    //                             name="lastRenewedCount"
    //                             id="lastRenewedCount"
    //                             value={props.profile.profile.renewAvailable}
    //                             variant="outlined"
    //                             size="small"
    //                             helperText="Felhasználható előre helyezések száma."
    //                             // onChange={(event) => this.onRegistrationFormItemChanged(event)}
    //                         />
    //                     </Grid>
    //
    //                     <Grid item xs={3}>
    //                         <Button variant="contained" color="primary">
    //                             Előre helyezés most
    //                         </Button>
    //                     </Grid>
    //
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //
    //     </ProfileDetails>
    //
    //     <ProfileDetails value={value} index={8}>
    //
    //         <p>Profil képek kezelése. Csak húzd be a képeket a keretbe, és a feltöltésük automatikusan megtörténik. Az előnyös képpel rendelkező
    //             "bizalomgerjesztő" profilok több megkeresésre számíthatnak.</p>
    //
    //         <Grid container spacing={5}>
    //             <Grid item xs={12}>
    //                 <DropzoneArea name="images" onChange={(event) => this.onRegistrationFormItemChanged(event)}/>
    //             </Grid>
    //         </Grid>
    //
    //         <p>A feltöltött profilképek kezelése. Itt választható ki a kezdő kép is.</p>
    //         <small>Cardok a már feltöltött képekről...</small>
    //     </ProfileDetails>
    //
    //
    //     <ProfileDetails value={value} index={9}>
    //
    //         <p>Minden profilon vézett művelet megjelenik a listában, itt követhető vissza a profil előélete.</p>
    //
    //         <Paper elevation={3} bgcolor="#f7f7f7">
    //
    //             <Box p={3} mb={3}>
    //
    //                 <Grid container spacing={3}>
    //                     <Grid item xs={12}>
    //
    //                         <Timeline align="alternate">
    //                             <TimelineItem>
    //                                 <TimelineOppositeContent>
    //                                     <Typography variant="body2" color="textSecondary">
    //                                         2021.07.08 02:44:56
    //                                     </Typography>
    //                                 </TimelineOppositeContent>
    //                                 <TimelineSeparator>
    //                                     <TimelineDot>
    //                                         <FastfoodIcon/>
    //                                     </TimelineDot>
    //                                     <TimelineConnector/>
    //                                 </TimelineSeparator>
    //                                 <TimelineContent>
    //                                     <Paper elevation={3} className={classes.paper}>
    //                                         <Typography variant="h6" component="h1">
    //                                             Kiemelés
    //                                         </Typography>
    //                                         <Typography>Felhasználó</Typography>
    //                                     </Paper>
    //                                 </TimelineContent>
    //                             </TimelineItem>
    //                             <TimelineItem>
    //                                 <TimelineOppositeContent>
    //                                     <Typography variant="body2" color="textSecondary">
    //                                         2021.07.06 10:34:22
    //                                     </Typography>
    //                                 </TimelineOppositeContent>
    //                                 <TimelineSeparator>
    //                                     <TimelineDot color="primary">
    //                                         <LaptopMacIcon/>
    //                                     </TimelineDot>
    //                                     <TimelineConnector/>
    //                                 </TimelineSeparator>
    //                                 <TimelineContent>
    //                                     <Paper elevation={3} className={classes.paper}>
    //                                         <Typography variant="h6" component="h1">
    //                                             Adatmódosítás
    //                                         </Typography>
    //                                         <Typography>Administrátor</Typography>
    //                                     </Paper>
    //                                 </TimelineContent>
    //                             </TimelineItem>
    //                             <TimelineItem>
    //                                 <TimelineSeparator>
    //                                     <TimelineDot color="primary" variant="outlined">
    //                                         <HotelIcon/>
    //                                     </TimelineDot>
    //                                     <TimelineConnector className={classes.secondaryTail}/>
    //                                 </TimelineSeparator>
    //                                 <TimelineOppositeContent>
    //                                     <Typography variant="body2" color="textSecondary">
    //                                         2021.06.09. 20:05:19
    //                                     </Typography>
    //                                 </TimelineOppositeContent>
    //                                 <TimelineContent>
    //                                     <Paper elevation={3} className={classes.paper}>
    //                                         <Typography variant="h6" component="h1">
    //                                             Adminisztrátor
    //                                         </Typography>
    //                                         <Typography>Profil engedélyezés</Typography>
    //                                     </Paper>
    //                                 </TimelineContent>
    //                             </TimelineItem>
    //                             <TimelineItem>
    //                                 <TimelineSeparator>
    //                                     <TimelineDot color="secondary">
    //                                         <RepeatIcon/>
    //                                     </TimelineDot>
    //                                 </TimelineSeparator>
    //                                 <TimelineOppositeContent>
    //                                     <Typography variant="body2" color="textSecondary">
    //                                         2021.06.01. 10:02:15
    //                                     </Typography>
    //                                 </TimelineOppositeContent>
    //                                 <TimelineContent>
    //                                     <Paper elevation={3} className={classes.paper}>
    //                                         <Typography variant="h6" component="h1">
    //                                             Felhasználó
    //                                         </Typography>
    //                                         <Typography>Regisztráció</Typography>
    //                                     </Paper>
    //                                 </TimelineContent>
    //                             </TimelineItem>
    //                         </Timeline>
    //
    //                     </Grid>
    //                 </Grid>
    //             </Box>
    //         </Paper>
    //
    //     </ProfileDetails>
    // </div>
    // );

}
