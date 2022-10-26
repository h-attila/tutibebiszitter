import {Box, Card, Container, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Switch from "@material-ui/core/Switch";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import MoodIcon from "@material-ui/icons/Mood";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import axios from "axios";
import moment from "moment";
import React, {Component} from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import history from "../../../../../app/store/history/history";
import AuthService from "../../../AuthService";
import Page from "../../../components/Page";

class ListView extends Component {

    state = {
        init: false,
        title: '',
        data: [],
        filter: 'all',      // active, inactive, all
        page: 0,
        limit: 25
    }

    componentDidMount() {
        if (!this.state.init) {

            if (this.props.name) {
                this.getList();
            }

            if (this.props.title) {
                this.setState({title: this.props.title});
            }
        }

        this.setState({init: true});
    }

    handleLimitChange = (event) => {
        this.setState({
            limit: event.target.value
        });
    };

    handlePageChange = (event) => {
        this.setState({
            page: event.target.value
        });
    };

    handleSwitchChange(event, index, id) {
        let tmpData = this.state.data;
        tmpData[index].enabled = event.target.checked;
        tmpData[index].disabled = true;
        tmpData[index].lastModified = new moment();
        this.setState({tmpData});

        let postData = {
            id: id,
            enabled: event.target.checked
        }

        // kilép, ha lejárt
        if (AuthService.isTokenExpired()) {
            history.push('/bejelentkezes');
            window.location.reload();
        }

        axios
            .put('admin/api/list-items/' + this.props.name + '/set-enabled', postData, {headers: AuthService.getAuthHeader()})
            .then(response => {
                if (response.status === 200) {
                    tmpData[index].disabled = false;
                    this.setState({tmpData});
                }
            })
            .catch(reason => {
                console.log('»» hiba történt', reason);   // todo: tesztelni, error ágra megy
            })
        ;
    }

    handlePublicSwitchChange(event, index, id) {
        let tmpData = this.state.data;
        tmpData[index].public = event.target.checked;
        tmpData[index].disabled = true;
        tmpData[index].lastModified = new moment();
        this.setState({tmpData});

        let postData = {
            id: id,
            public: event.target.checked
        }

        // kilép, ha lejárt
        if (AuthService.isTokenExpired()) {
            history.push('/bejelentkezes');
            window.location.reload();
        }

        axios
            .put('admin/api/list-items/' + this.props.name + '/set-public', postData, {headers: AuthService.getAuthHeader()})
            .then(response => {
                if (response.status === 200) {
                    tmpData[index].disabled = false;
                    this.setState({tmpData});
                }
            })
            .catch(reason => {
                console.log('»» hiba történt', reason);   // todo: tesztelni, error ágra megy
            })
        ;
    }

    deleteItem(event, index, id, label) {

        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Ellenőrzés...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
        });

        console.log('»» data', {data: {id: id}});

        // kilép, ha lejárt
        if (AuthService.isTokenExpired()) {
            history.push('/bejelentkezes');
            window.location.reload();
        }

        axios
            .post('admin/api/list-items/' + this.props.name + '/pre-check-delete', {id: id}, {headers: AuthService.getAuthHeader()})
            .then(response => {

                console.log('»» pre-check-del resp', response);

                if (response.status === 200) {
                    let text;
                    if (response.data.count === 0) {
                        text = 'Nincsen használatban, szabadon törölhető.';
                    } else if (response.data.count > 0) {
                        text = 'Használat: <b>' + response.data.count + '</b> rekordnál. A törlés során elveszik ez a tulajdonság!</small>';
                    } else {
                        MySwal.fire({
                            icon: 'error',
                            title: 'A törlés nem sikerült',
                            text: label
                        })
                        return;
                    }

                    MySwal.fire({
                        title: 'Tényleg törlöd?',
                        html: label + '<br><br><small>' + text,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Igen',
                        cancelButtonText: 'Mégsem'
                    }).then((result) => {
                        if (result.isConfirmed) {

                            MySwal.fire({
                                title: 'Törlés folyamatban...',
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                showCancelButton: false,
                                showConfirmButton: false,
                            });

                            axios
                                .delete('admin/api/list-items/' + this.props.name + '/delete', {data: {id: id}, headers: AuthService.getAuthHeader()})
                                .then(response => {
                                    if (response.status === 200) {
                                        let data = [...this.state.data];
                                        data.splice(index, 1);
                                        this.setState({data: data});

                                        MySwal.fire({
                                            icon: 'success',
                                            title: 'Sikeres törlés',
                                            text: label
                                        })
                                    }
                                })
                                .catch(reason => {
                                    MySwal.fire({
                                        icon: 'error',
                                        title: 'A törlés nem sikerült',
                                        text: label
                                    })
                                })
                            ;
                        }
                    });
                }
            })
            .catch(reason => {
                MySwal.fire({
                    icon: 'error',
                    title: 'A törlés nem sikerült',
                    text: label
                })
            });
    }

    editItem(id, label, weight) {

        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Szerkesztés',
            html: '<input type="text" id="label" class="swal2-input" value="' + label + '" placeholder="megnevezés"><input type="text" id="weight" class="swal2-input" value="' + weight + '" placeholder="súly" onkeypress="return event.charCode >= 48 && event.charCode <= 57">',
            showCancelButton: true,
            confirmButtonText: 'Mentés',
            cancelButtonText: 'Mégsem',
            preConfirm: () => {
                let data;
                for (let d of this.state.data) {
                    if (d.id === id) {
                        data = d;
                        break;
                    }
                }

                if (!data) {
                    return;
                }

                const label = Swal.getPopup().querySelector('#label').value;
                const weight = Swal.getPopup().querySelector('#weight').value;

                if (!label || !weight) {
                    Swal.showValidationMessage(`Kérlek, ellenőrizd a megadott adatokat`)
                }

                data.label = label;
                data.weight = weight;

                return data;
            },
            allowOutsideClick: () => !Swal.isLoading(),
            backdrop: true
        }).then((data) => {

            if (data.isConfirmed) {

                MySwal.fire({
                    title: 'Mentés folyamatban...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                });

                // kilép, ha lejárt
                if (AuthService.isTokenExpired()) {
                    history.push('/bejelentkezes');
                    window.location.reload();
                }

                axios
                    .put('admin/api/list-items/' + this.props.name + '/edit/' + data.value.id, data.value, {headers: AuthService.getAuthHeader()})
                    .then(response => {

                        console.log('resp status: ', response.status);

                        if (response.status === 200 && response.data) {

                            let data = JSON.parse(response.data);
                            data.lastModified = moment();

                            let key = Object.keys(this.state.data).find(k => this.state.data[k].id === id);

                            this.state.data.splice(parseInt(key), 1);
                            this.setState({
                                data: [
                                    ...this.state.data,
                                    data
                                ]
                            });

                            MySwal.fire({
                                icon: 'success',
                                title: 'Sikeres mentés',
                            });

                        } else {

                            MySwal.fire({
                                icon: 'error',
                                title: 'Ismeretlen hiba történt',
                                text: label
                            })
                        }

                    })
                    .catch((error) => {
                        let label = '';

                        if (error.response.data && error.response.data.length > 0) {
                            for (let data of error.response.data) {
                                label += ' ' + data;
                            }
                        } else {
                            label = 'Adatok mentése nem sikerült.';
                        }

                        MySwal.fire({
                            icon: 'error',
                            title: 'Hiba történt',
                            text: label
                        })
                    });
            }
        })
    }


    addItem(e) {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Hozzáadás',
            html: '<input type="text" id="label" class="swal2-input" value="" placeholder="megnevezés"><input type="text" id="weight" class="swal2-input" value="" placeholder="sorrend" onkeypress="return event.charCode >= 48 && event.charCode <= 57">',
            showCancelButton: true,
            confirmButtonText: 'Mentés',
            cancelButtonText: 'Mégsem',
            preConfirm: () => {
                const label = Swal.getPopup().querySelector('#label').value;
                const weight = Swal.getPopup().querySelector('#weight').value;

                if (!label || !weight) {
                    Swal.showValidationMessage(`Kérlek, ellenőrizd a megadott adatokat`)
                }

                return {
                    label: label,
                    weight: weight
                };
            },
            allowOutsideClick: () => !Swal.isLoading(),
            backdrop: true
        }).then((data) => {

            if (data.isConfirmed) {

                MySwal.fire({
                    title: 'Mentés folyamatban...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                });

                // kilép, ha lejárt
                if (AuthService.isTokenExpired()) {
                    history.push('/bejelentkezes');
                    window.location.reload();
                }

                axios
                    .put('admin/api/list-items/' + this.props.name + '/add', data.value, {headers: AuthService.getAuthHeader()})
                    .then(response => {
                        if (response.status === 200) {

                            // újra lekérjük a listát (lefut az init)
                            this.getList();

                            MySwal.fire({
                                icon: 'success',
                                title: 'Sikeres hozzáadás',
                            });
                        }

                    })
                    .catch((error) => {
                        let label = '';

                        if (error.response.data && error.response.data.length > 0) {
                            for (let data of error.response.data) {
                                label += ' ' + data;
                            }
                        } else {
                            label = 'Adatok mentése nem sikerült.';
                        }

                        MySwal.fire({
                            icon: 'error',
                            title: 'Hiba történt',
                            text: label
                        })
                    });
            }
        })
    }

    getList(filter) {
        filter = filter ?? this.state.filter;

        // kilép, ha lejárt
        if (AuthService.isTokenExpired()) {
            history.push('/bejelentkezes');
            window.location.reload();
        }

        axios
            .get('admin/api/list-items/' + this.props.name + '/get-list/' + filter, {headers: AuthService.getAuthHeader()})
            .then(response => {
                if (response.status === 200 && response.data.length > 0) {

                    for (let key in response.data) {
                        response.data[key].lastModified = moment(response.data[key].lastModified);
                    }

                    this.setState({data: response.data});
                }
            });
    }

    filterList(filter) {
        this.setState({filter: filter});
        this.getList(filter);
    }

    render() {
        console.log('»» render paymode', this.state);

        return (
            <Page
                title={this.state.title}
            >
                <Container maxWidth={false}>
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        mt={2}
                    >
                        <Button variant="outlined" color="primary" size="small" startIcon={<AddCircleIcon/>} onClick={(event) => this.addItem(event)}>
                            Új hozzáadása
                        </Button>
                        <Box
                            display="flex"
                            justifyContent="flex-end"

                        >
                            <Box mr={1}>
                                <Button variant={this.state.filter === 'active' ? 'contained' : 'outlined'} color="primary" size="small" startIcon={<MoodIcon/>}
                                        onClick={() => this.filterList('active')}>
                                    Aktív
                                </Button>
                            </Box>
                            <Box mr={1}>
                                <Button variant={this.state.filter === 'inactive' ? 'contained' : 'outlined'} color="primary" size="small"
                                        startIcon={<SentimentVeryDissatisfiedIcon/>} onClick={() => this.filterList('inactive')}>
                                    Inaktív
                                </Button>
                            </Box>
                            <Button variant={this.state.filter === 'all' ? 'contained' : 'outlined'} color="primary" size="small"
                                    startIcon={<AllInclusiveIcon/>} onClick={() => this.filterList('all')}>
                                Összes
                            </Button>
                        </Box>
                    </Box>

                    <Box mt={3}>
                        <Card>
                            <PerfectScrollbar>
                                <Box>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Név
                                                </TableCell>
                                                <TableCell align="center">
                                                    Módosítva
                                                </TableCell>
                                                <TableCell align="center">
                                                    Sorrend
                                                </TableCell>
                                                <TableCell align="center">
                                                    Engedélyezve
                                                </TableCell>
                                                <TableCell align="center">
                                                    Műveletek
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.data.slice(this.state.limit.min, this.state.limit.max).map((item, index) => (
                                                <TableRow
                                                    hover
                                                    key={item.id}
                                                >
                                                    <TableCell>
                                                        {item.label}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.lastModified.format('YYYY.MM.DD HH:mm:ss')}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.weight}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Switch
                                                            onChange={(event) => this.handleSwitchChange(event, index, item.id)}
                                                            color="primary"
                                                            checked={item.enabled}
                                                            disabled={item.disabled}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <ButtonGroup variant="outlined" size="small" color="primary"
                                                                     aria-label="small outlined primary button group">
                                                            <Button>
                                                                <EditIcon fontSize="small" color="primary"
                                                                          onClick={(event) => this.editItem(item.id, item.label, item.weight)}/>
                                                            </Button>
                                                            <Button>
                                                                <HighlightOffIcon fontSize="small" color="error"
                                                                                  onClick={(event) => this.deleteItem(event, index, item.id, item.label)}/>
                                                            </Button>
                                                        </ButtonGroup>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </PerfectScrollbar>
                            <TablePagination
                                component="div"
                                count={this.state.data.length}
                                onChangePage={(event) => this.handlePageChange(event)}
                                onChangeRowsPerPage={(event) => this.handleLimitChange(event)}
                                page={this.state.page}
                                rowsPerPage={this.state.limit}
                                rowsPerPageOptions={[25, 50, 100, 250]}
                            />
                        </Card>
                    </Box>
                </Container>
            </Page>
        );
    }
}

export default ListView;
