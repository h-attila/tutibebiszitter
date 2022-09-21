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
import React from 'react';
import PerfectScrollbar from "react-perfect-scrollbar";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import history from "../../../../../app/store/history/history";
import AuthService from "../../../AuthService";
import Page from "../../../components/Page";
import ListView from "./ListView";

class ListViewPayMode extends ListView {

    editItem(id, label, weight, description) {

        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Szerkesztés',
            html: '<input type="text" id="label" class="swal2-input" value="' + label + '" placeholder="megnevezés">' +
                '<textarea id="description" class="swal2-input" placeholder="leírás">' + description + '</textarea>' +
                '<input type="text" id="weight" class="swal2-input" value="' + weight + '" placeholder="súly" onkeypress="return event.charCode >= 48 && event.charCode <= 57">',
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
                const description = Swal.getPopup().querySelector('#description').value;

                if (!label || !weight || !description) {
                    Swal.showValidationMessage(`Kérlek, ellenőrizd a megadott adatokat`)
                }

                data.label = label;
                data.weight = weight;
                data.description = description;

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
                    .put('api/list-items/' + this.props.name + '/edit/' + data.value.id, data.value, {headers: AuthService.getAuthHeader()})
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
            html: '<input type="text" id="label" class="swal2-input" placeholder="megnevezés">' +
                '<textarea id="description" class="swal2-input" placeholder="leírás"></textarea>' +
                '<input type="text" id="weight" class="swal2-input" placeholder="súly" onkeypress="return event.charCode >= 48 && event.charCode <= 57">',
            showCancelButton: true,
            confirmButtonText: 'Mentés',
            cancelButtonText: 'Mégsem',
            preConfirm: () => {
                const label = Swal.getPopup().querySelector('#label').value;
                const weight = Swal.getPopup().querySelector('#weight').value;
                const description = Swal.getPopup().querySelector('#description').value;

                if (!label || !weight || !description) {
                    Swal.showValidationMessage(`Kérlek, ellenőrizd a megadott adatokat`)
                }

                return {
                    label: label,
                    weight: weight,
                    description: description
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
                    .put('api/list-items/' + this.props.name + '/add', data.value, {headers: AuthService.getAuthHeader()})
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
                                                            name={item.name}
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
                                                                          onClick={(event) => this.editItem(item.id, item.label, item.weight, item.description)}/>
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

export default ListViewPayMode;
