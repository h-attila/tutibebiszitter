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
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import {NavLink} from "react-router-dom";
import AvTimerIcon from '@material-ui/icons/AvTimer';
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const NearExpire = ({ className, userStatistics, ...rest }) => {
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
              LEJÁRÓ TAGOK
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
              <AvTimerIcon />
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

NearExpire.propTypes = {
  className: PropTypes.string,
  userStatistics: PropTypes.number
};

export default NearExpire;
