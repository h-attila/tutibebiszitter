import React, {Component} from 'react';
import {connect} from "react-redux";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Badge from "@mui/material/Badge";
import TextField from '@mui/material/TextField';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MapIcon from '@mui/icons-material/Map';
import SavingsIcon from '@mui/icons-material/Savings';
import SchoolIcon from '@mui/icons-material/School';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import classes from './Profile.scss';

class Profile extends Component {

    componentDidMount() {
        console.log('>> Profile before');
        console.log('>> Profile', this.state);
    }

    render() {

        return (
            <Container className={[classes.Profile, ""].join(' ')}>

                {/*<Grid container spacing={1}>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        */}
                {/*    </Grid>*/}
                {/*</Grid>*/}

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
                            className={classes.SocialBoxes}
                            width="100%"
                        >
                            <a href="#"><FacebookIcon className={classes.SocialIcon}/></a>
                            <a href="#"><InstagramIcon className={classes.SocialIcon}/></a>
                            <a href="#"><LanguageIcon className={classes.SocialIcon}/></a>
                        </Box>

                        <Box className={[classes.TableInfoBox, 'p-2'].join(' ')}>
                            <h4 className="p-1 h-0">Kapcsolat</h4>
                            <hr className="p-1 m-0"/>
                            <p className="mb-3">Csörgess meg:</p>
                            <h5 className="text-center">06 20 123 4567</h5>
                            <p className="mb-2">Vagy küldj üzenetet:</p>
                            <TextField
                                className="w-100 m-1 p-1"
                                id="message_name"
                                label='Neved'
                                size="small"
                            />
                            <TextField
                                className="w-100 m-1 p-1"
                                id="message_email"
                                label='E-mail címed'
                                size="small"
                            />
                            <TextField
                                className="w-100 m-1 p-1"
                                id="message_message"
                                multiline
                                rows={7}
                                label='Írd ide az üzeneted'
                                size="small"
                            />
                            <Button
                                variant="outlined"
                                className={[classes.Button, 'w-100 m-1'].join(' ')}
                            >Üzenetet küldök
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={8} md={6}>
                        <Box className={[classes.TableInfoBox, 'pl-2 pr-2 pb-2 pt-0'].join(' ')}>
                            <h4 className="p-1 h-0">Személyes adataim</h4>
                            <hr className="p-1 m-0"/>
                            <Box textAlign="center">
                                <h3 className="m-1"><FormatQuoteIcon/>Több éves tapasztalattal gyermekfelügyeletet vállalok</h3>
                            </Box>
                            <TableContainer className="p-2">
                                <Table>
                                    <TableBody>
                                        <TableRow key="name" sx={{'td': {border: 0}}}>
                                            <TableCell align="left" style={{width: 150}} className="p-2">
                                                <p className="mb-1"><AccountBoxIcon className="mr-1" fontSize="small"/>Név:</p>
                                            </TableCell>
                                            <TableCell align="left" className="p-2" sx={{fontWeight: 600}}>
                                                {/*<p className="mb-1">Teszt Elek <Badge key="3" className={[classes.Sign, 'ml-1'].join(' ')}>Kiemelt</Badge><Badge key="34" className={[classes.Sign, classes.Orange, 'ml-1'].join(' ')}>Új tag</Badge></p>*/}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="place" sx={{'td': {border: 0}}}>
                                            <TableCell align="left" className="p-2">
                                                <p className="mb-1"><MapIcon className="mr-1" fontSize="small"/>Helyszín(ek):</p>
                                            </TableCell>
                                            <TableCell align="left" className="p-2" sx={{fontWeight: 600}}>
                                                <p className="mb-1">Aprajafalva, Törp u.</p>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="phone" sx={{'td': {border: 0}}}>
                                            <TableCell align="left" className="p-2">
                                                <p className="mb-1"><SchoolIcon className="mr-1" fontSize="small"/>Gyakorlat:</p>
                                            </TableCell>
                                            <TableCell align="left" className="p-2" sx={{fontWeight: 600}}>
                                                <p className="mb-1">10 év, ebből 2 év külföld</p>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow key="price" sx={{'td': {border: 0}}}>
                                            <TableCell align="left" className="p-2">
                                                <p className="mb-1"><SavingsIcon className="mr-1" fontSize="small"/>Óradíj:</p>
                                            </TableCell>
                                            <TableCell align="left" className="p-2" sx={{fontWeight: 600}}>
                                                <p className="mb-1">5000Ft / óra</p>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                        <Box className={[classes.TableInfoBox, 'p-2'].join(' ')}>
                            <h4 className="p-1 h-0">Elsősorban az alábbi gyermekeket keresem</h4>
                            <hr className="p-1 m-0"/>
                            {/*<Badge key="12" className={[classes.Sign, classes.Base].join(' ')}>Bölcsöde</Badge>*/}
                            {/*<Badge key="22" className={[classes.Sign, classes.Base].join(' ')}>Óvoda</Badge>*/}
                            {/*<Badge key="32" className={[classes.Sign, classes.Base].join(' ')}>Ált. Iskola</Badge>*/}
                            <p className="mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                est laborum.</p>
                        </Box>

                        <Box className={[classes.TableInfoBox, 'p-2'].join(' ')}>
                            <h4 className="p-1 h-0">Előnyben részesített időpontjaim</h4>
                            <hr className="p-1 m-0"/>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                                architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                                voluptatem sequi nesciunt.</p>
                        </Box>

                        <Box className={[classes.TableInfoBox, 'p-2'].join(' ')}>
                            <h4 className="p-1 h-0">Bemutatkozásom</h4>
                            <hr className="p-1 m-0"/>
                            <Box>
                                {/*<Badge key="13" className={[classes.Sign, classes.AddServices].join(' ')}>*/}
                                {/*    Vállalok hátrányos helyzetű gyermeket</Badge>*/}
                                <Badge key="23">Szakképzett bébiszitter vagyok</Badge>
                                {/*<Badge key="33" className={[classes.Sign, classes.AddServices].join(' ')}>Tudok takarítani</Badge>*/}
                                <Badge key="43">Van autóm</Badge>
                            </Box>
                            <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising
                                pain was born and I will give you a complete account of the system, and expound the
                                actual teachings of the great explorer of the truth, the master-builder of human
                                happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure,
                                but because those who do not know how to pursue pleasure rationally encounter
                                consequences that are extremely painful. Nor again is there anyone who loves or pursues
                                or desires to obtain pain of itself, because it is pain, but because occasionally
                                circumstances occur in which toil and pain can procure him some great pleasure. To take
                                a trivial example, which of us ever undertakes laborious physical exercise, except to
                                obtain some advantage from it? But who has any right to find fault with a man who
                                chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain
                                that produces no resultant pleasure?</p>
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
                                <li>
                                    <span>
                                       <FormatQuoteIcon/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        <br/>
                                    -- <b>Teszt Emberke</b>
                                        <br/>
                                        <hr/>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                       <FormatQuoteIcon/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        <br/>
                                    -- <b>Teszt Emberke</b>
                                        <br/>
                                        <hr/>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                       <FormatQuoteIcon/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        <br/>
                                    -- <b>Teszt Emberke</b>
                                        <br/>
                                        <hr/>
                                    </span>
                                </li>
                                <li>
                                    <span>
                                       <FormatQuoteIcon/>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        <br/>
                                    -- <b>Teszt Emberke</b>
                                    </span>
                                </li>
                            </ul>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

        );
    }
}

const mapStateToProps = state => {
    return {
        // services: state.search.options.service,
        // places: state.search.options.place,
        // languages: state.search.options.language,
        // packages: state.packages,
        // submitDisabled: state.registration.submitDisabled,
        // formErrors: state.registration.formErrors,
        // successRegistration: state.registration.successRegistration
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // packagesInit: () => dispatch(actionCreators.packagesInit()),
        // servicesInit: () => dispatch(actionCreators.searchFormInit()),
        // registrationFormSubmit: (formData) => dispatch(actionCreators.registrationFormSubmit(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
