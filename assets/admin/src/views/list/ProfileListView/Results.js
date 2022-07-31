import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Avatar, Box, Card, makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography} from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Swal from 'sweetalert2';
import getInitials from '../../../utils/getInitials';
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import AuthService from "../../../AuthService";
import history from "../../../../../app/store/history/history";

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const Results = ({className, list, ...rest}) => {

    const customers = rest.customers;

    const classes = useStyles();
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const deleteProfile = (uuid) => {
        const MySwal = withReactContent(Swal);

        MySwal.fire({
            title: 'Biztosan törlöd?',
            text: 'Nem visszavonható művelet!',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6A1B9A',
            cancelButtonText: 'Mégsem',
            confirmButtonText: 'Törlöm!'
        }).then((result) => {
            if (result.isConfirmed) {

                MySwal.fire({
                    title: 'Törlés folyamatban...',
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                });

                // profil adatok lekérése
                // kilép, ha lejárt
                if (AuthService.isTokenExpired()) {
                    history.push('/bejelentkezes');
                    window.location.reload();
                }

                axios
                    .delete('/admin/api/profile/delete/' + uuid, {headers: AuthService.getAuthHeader()})
                    .then(response => {

                        if (response.status === 200) {

                            window.location.reload();

                            Swal.fire(
                                'Sikeres törlés',
                                'Az oldal újratöltődik.',
                                'success'
                            );

                        } else {
                            Swal.fire(
                                'Hiba történt',
                                'Törlés nem sikerült!',
                                'error'
                            );
                        }
                    });
            }
        })
    }

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <PerfectScrollbar>
                <Box minWidth={1050}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {/*<TableCell padding="checkbox">*/}
                                {/*  <Checkbox*/}
                                {/*    checked={selectedCustomerIds.length === customers.length}*/}
                                {/*    color="primary"*/}
                                {/*    indeterminate={*/}
                                {/*      selectedCustomerIds.length > 0*/}
                                {/*      && selectedCustomerIds.length < customers.length*/}
                                {/*    }*/}
                                {/*    onChange={handleSelectAll}*/}
                                {/*  />*/}
                                {/*</TableCell>*/}
                                <TableCell align="center">
                                    Műveletek
                                </TableCell>
                                <TableCell align="center">
                                    Név <ArrowDropUpIcon/>
                                </TableCell>
                                <TableCell align="center">
                                    Kiemelés
                                </TableCell>
                                <TableCell align="center">
                                    Tagság kezdet
                                </TableCell>
                                <TableCell align="center">
                                    Tagság vég
                                </TableCell>
                                <TableCell align="center">
                                    Regisztráció
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.slice(0, limit).map((customer) => (
                                <TableRow
                                    hover
                                    key={customer.id}
                                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                                >
                                    <TableCell align="center">
                                        <ButtonGroup variant="outlined" size="small" color="primary" aria-label="small outlined primary button group">
                                            <Button href={'./profil/' + customer.uuid}>
                                                <EditIcon fontSize="small" color="primary"/>
                                            </Button>
                                            <Button onClick={() => window.open("./profil-elonezet/" + customer.uuid, "_blank")}>
                                                <AssignmentIndIcon fontSize="small" color="primary"/>
                                            </Button>
                                            <Button onClick={() => deleteProfile(customer.uuid)}>
                                                <HighlightOffIcon fontSize="small" color="error"/>
                                            </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            alignItems="center"
                                            display="flex"
                                        >
                                            <Avatar
                                                className={classes.avatar}
                                                src={customer.avatarUrl}
                                            >
                                                {getInitials(customer.name)}
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                {customer.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">
                                        {(customer.highlighted) ? moment(customer.highlighted.date).format('YYYY.MM.DD') : '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(customer.regStart) ? moment(customer.regStart.date).format('YYYY.MM.DD') : '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(customer.regEnd) ? moment(customer.regEnd.date).format('YYYY.MM.DD') : '-'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {(customer.created) ? moment(customer.created.date).format('YYYY.MM.DD') : '-'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={customers.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    customers: PropTypes.array.isRequired
};

export default Results;
