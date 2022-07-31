import React, {useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Switch from '@material-ui/core/Switch';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import getInitials from '../../../utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({className, data, ...rest}) => {
  const classes = useStyles();
  const [selectedDataIds, setSelectedDataIds] = useState([]);
  const [limit, setLimit] = useState(10);
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

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedDataIds.indexOf(id);
    let newSelectedDataIds = [];

    if (selectedIndex === -1) {
      newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds, id);
    } else if (selectedIndex === 0) {
      newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds.slice(1));
    } else if (selectedIndex === selectedDataIds.length - 1) {
      newSelectedDataIds = newSelectedDataIds.concat(selectedDataIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedDataIds = newSelectedDataIds.concat(
        selectedDataIds.slice(0, selectedIndex),
        selectedDataIds.slice(selectedIndex + 1)
      );
    }

    setSelectedDataIds(newSelectedDataIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

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
                <TableCell align="center" width="200">
                  Módosítva
                </TableCell>
                <TableCell align="center" width="200">
                  Sorrend
                </TableCell>
                <TableCell align="center" width="200">
                  Engedélyezve
                </TableCell>
                <TableCell align="center" width="200">
                  Műveletek
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { data.slice(0, limit).map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  selected={selectedDataIds.indexOf(item.id) !== -1}
                >
                  <TableCell>
                    {item.label}
                  </TableCell>
                  <TableCell align="center">
                    {moment(item.lastUpdated).format('YYYY.MM.DD HH:mm:ss')}
                  </TableCell>
                  <TableCell align="center">
                    {item.weight}
                  </TableCell>
                  <TableCell align="center">
                    <Switch
                      // checked={state.checkedB}
                      // onChange={handleChange}
                      name="checkedB"
                      color="primary"
                      checked={item.enabled}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <ButtonGroup variant="outlined" size="small" color="primary" aria-label="small outlined primary button group">
                      <Button>
                        <EditIcon fontSize="small" color="primary"/>
                      </Button>
                      <Button>
                        <HighlightOffIcon fontSize="small" color="error"/>
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
        count={data.length}
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
  data: PropTypes.array.isRequired
};

export default Results;
