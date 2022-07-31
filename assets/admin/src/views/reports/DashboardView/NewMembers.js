import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';

import {NavLink} from 'react-router-dom';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const NewMembers = ({ className, userStatistics, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              ÚJ TAGOK
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {userStatistics}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PersonAddIcon/>
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <Typography
            color="textSecondary"
            variant="caption"
          >
            <NavLink to="#">
              tovább a listához <ChevronRightIcon style={{ fontSize: 17, fontWeight: 300 }} />
            </NavLink>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

NewMembers.propTypes = {
  className: PropTypes.string,
  userStatistics: PropTypes.number,
};

export default NewMembers;
