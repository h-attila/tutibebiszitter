import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Switch from '@material-ui/core/Switch';
import {Box, Card, makeStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {},
    avatar: {
        marginRight: theme.spacing(2)
    }
}));

const Results = ({className, data, ...rest}) => {
    const classes = useStyles();
    const [selectedDataIds, setSelectedDataIds] = useState([]);
    const [limit, setLimit] = useState(50);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedDataIds;

        if (event.target.checked) {
            newSelectedDataIds = data.map((data) => data.id);
        } else {
            newSelectedDataIds = [];
        }

        setSelectedDataIds(newSelectedDataIds);
    };

    // const handleSelectOne = (event, id) => {
    //     const selectedIndex = selectedDataIds.indexOf(id);
    //     let newSelectedDataIds = [];
    //
    //     if (selectedIndex === -1) {
    //         newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds, id);
    //     } else if (selectedIndex === 0) {
    //         newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds.slice(1));
    //     } else if (selectedIndex === selectedDataIds.length - 1) {
    //         newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds.slice(0, -1));
    //     } else if (selectedIndex > 0) {
    //         newSelectedDataIds = newSelectedDataIds.concat(
    //             selectedDataIds.slice(0, selectedIndex),
    //             selectedDataIds.slice(selectedIndex + 1)
    //         );
    //     }
    //
    //     setSelectedDataIds(newSelectedDataIds);
    // };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    // const handleSwitchChange = (event, index, id) => {
    //     let tmpData = this.state.data;
    //     tmpData[index].enabled = event.target.checked;
    //     tmpData[index].disabled = true;
    //     tmpData[index].lastModified = new moment();
    //     this.setState({tmpData});
    //
    //     let postData = {
    //         id: id,
    //         enabled: event.target.checked
    //     }
    //
    //     axios
    //         .put('/admin/api/list-items/' + this.props.name + '/set-enabled', postData)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 tmpData[index].disabled = false;
    //                 this.setState({tmpData});
    //             }
    //         })
    //         .catch(reason => {
    //             console.log('»» hiba történt', reason);   // todo: tesztelni, error ágra megy
    //         })
    //     ;
    // }

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
                                <TableCell>
                                    Név
                                </TableCell>
                                <TableCell align="center">
                                    Megye
                                </TableCell>
                                <TableCell align="center" width="200">
                                    Módosítva
                                </TableCell>
                                <TableCell align="center" width="200">
                                    Engedélyezve
                                </TableCell>
                                {/*<TableCell align="center" width="200">*/}
                                {/*  Műveletek*/}
                                {/*</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(0, limit).map((item) => (
                                <TableRow
                                    hover
                                    key={item.id}
                                    selected={selectedDataIds.indexOf(item.id) !== -1}
                                >
                                    <TableCell>
                                        {item.cityLabel}
                                    </TableCell>
                                    <TableCell align="center">
                                        {item.stateCode}
                                    </TableCell>
                                    <TableCell align="center">
                                        {moment(item.lastUpdated).format('YYYY.MM.DD HH:mm:ss')}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Switch
                                            onChange={(event) => this.handleSwitchChange(event, index, item.id)}
                                            color="primary"
                                            checked={item.enabled}
                                            disabled={item.disabled}
                                        />
                                    </TableCell>
                                    {/*<TableCell align="center">*/}
                                    {/*  <ButtonGroup variant="outlined" size="small" color="primary" aria-label="small outlined primary button group">*/}
                                    {/*    <Button>*/}
                                    {/*      <EditIcon fontSize="small" color="primary"/>*/}
                                    {/*    </Button>*/}
                                    {/*    <Button>*/}
                                    {/*      <HighlightOffIcon fontSize="small" color="error"/>*/}
                                    {/*    </Button>*/}
                                    {/*  </ButtonGroup>*/}
                                    {/*</TableCell>*/}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={data.length}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[25, 50, 100, 250]}
            />
        </Card>
    );
};

Results.propTypes = {
    className: PropTypes.string,
    data: PropTypes.array.isRequired
};

export default Results;
