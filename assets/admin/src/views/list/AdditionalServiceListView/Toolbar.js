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
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoodIcon from '@material-ui/icons/Mood';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
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
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
