import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors, Box
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {NavLink} from "react-router-dom";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const Modified = ({ className, userStatistics, ...rest }) => {
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
              MÓDOSULTAK
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
              <EditIcon />
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
              tovább a listához <ChevronRightIcon style={{ fontSize: 17 }} />
            </NavLink>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Modified.propTypes = {
  className: PropTypes.string,
  userStatistics: PropTypes.number
};

export default Modified;
