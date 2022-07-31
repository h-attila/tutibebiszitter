import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MoodIcon from '@material-ui/icons/Mood';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EditIcon from '@material-ui/icons/Edit';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Search as SearchIcon} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({className, ...rest}) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        mt={2}
      >
        <Button className={classes.exportButton} variant="outlined" color="primary" size="small" startIcon={<AddCircleIcon/>} onClick={() => this.deleteItem(event, index, item.id, item.label)}>
          Új hozzáadása
        </Button>
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          <Button className={classes.exportButton} variant="contained" color="primary" size="small" startIcon={<MoodIcon/>}>
            Aktív
          </Button>
          <Button className={classes.exportButton} variant="outlined" color="primary" size="small" startIcon={<SentimentVeryDissatisfiedIcon/>}>
            Inaktív
          </Button>
          <Button className={classes.exportButton} variant="outlined" color="primary" size="small" startIcon={<AllInclusiveIcon/>}>
            Összes
          </Button>
        </Box>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
