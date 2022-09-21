import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    makeStyles,
    colors, Typography
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AvTimerIcon from "@material-ui/icons/AvTimer";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import {Bar} from 'react-chartjs-2';
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {}
}));

const StatisticsByHistory = ({className, historyStatistics, ...rest}) => {
    const classes = useStyles();
    const theme = useTheme();

    // const months = ['jan', 'feb', 'már', 'ápr', 'máj', 'jun', 'júl', 'aug', 'sze', 'okt', 'nov', 'dec'];

    // const monthParser = (i) => {
    //     if (i > 12) {
    //         i = i - 12;
    //     }
    //
    //     return i;
    // }


    const d = new Date();
    let month = d.getMonth();

    let lab = [], dat = [];
    for (let key in historyStatistics) {
        if (historyStatistics.hasOwnProperty(key)) {
            lab.push(key);
            dat.push(historyStatistics[key]);
        }
    }

    const data = {
        datasets: [
            {
                backgroundColor: colors.indigo[500],
                data: dat,
                label: 'Aktív tagok'
            }
        ],
        labels: lab
    };

    const options = {
        animation: false,
        cornerRadius: 20,
        layout: {padding: 0},
        legend: {display: false},
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    barThickness: 12,
                    maxBarThickness: 10,
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
                    ticks: {
                        fontColor: theme.palette.text.secondary
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: theme.palette.text.secondary,
                        beginAtZero: true,
                        min: 0
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: theme.palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                        zeroLineColor: theme.palette.divider
                    }
                }
            ]
        },
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

    return (
        <Card
            className={clsx(classes.root, className)}
            {...rest}
        >
            <CardHeader title="Tagság statisztika"/>
            <Divider/>
            <CardContent>
                <Box
                    height={400}
                    position="relative"
                >
                    <Bar
                        data={data}
                        options={options}
                    />
                </Box>
            </CardContent>
            <Divider/>
            <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
            >
                <Typography
                    color="textSecondary"
                    variant="caption"
                    fontWeight={300}
                >
                    az elmúlt 12 hónap alapján
                </Typography>
            </Box>
        </Card>
    );
};

StatisticsByHistory.propTypes = {
    className: PropTypes.string,
    historyStatistics: PropTypes.object
};

export default StatisticsByHistory;
