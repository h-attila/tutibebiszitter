import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import PhoneIcon from '@material-ui/icons/Phone';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const StatisticsByUserStatus = ({ className, userStatistics, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [
          userStatistics.new,
          userStatistics.active,
          userStatistics.inactive,
          userStatistics.nearExpire,
          userStatistics.expired,
          userStatistics.modified,
        ],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.orange[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Új', 'Aktív', 'Inaktív', 'Lejáró', 'Lejárt', 'Módosult']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Új',
      value: userStatistics.new,
      icon: PhoneIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Aktív',
      value: userStatistics.active,
      icon: PhoneIcon,
      color: colors.red[600]
    },
    {
      title: 'Inaktív',
      value: userStatistics.inactive,
      icon: PhoneIcon,
      color: colors.orange[600]
    },
    {
      title: 'Lejáró',
      value: userStatistics.nearExpire,
      icon: PhoneIcon,
      color: colors.amber[600]
    },
    {
      title: 'Lejárt',
      value: userStatistics.expired,
      icon: PhoneIcon,
      color: colors.teal[600]
    },
    {
      title: 'Módosult',
      value: userStatistics.modified,
      icon: PhoneIcon,
      color: colors.blueGrey[600]
    }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Tagság összetétel" />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          mt={2}
        >
          {devices.map(({
            color,
            title,
            value
          }) => (
            <Box
              key={title}
              p={1}
              textAlign="center"
            >
              <Typography
                color="textSecondary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="caption"
              >
                {value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

StatisticsByUserStatus.propTypes = {
  className: PropTypes.string,
  userStatistics: PropTypes.object
};

export default StatisticsByUserStatus;
