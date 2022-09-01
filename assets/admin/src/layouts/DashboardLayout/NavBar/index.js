import {Avatar, Box, Divider, Drawer, Hidden, List, makeStyles, Typography} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExtensionIcon from '@material-ui/icons/Extension';
import FlagIcon from '@material-ui/icons/Flag';
import GroupsIcon from '@material-ui/icons/Group';
import PlaceIcon from '@material-ui/icons/Place';
import SettingsIcon from '@material-ui/icons/Settings';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Users as UsersIcon} from 'react-feather';
import {Link as RouterLink, useLocation} from 'react-router-dom';

import NavItem from './NavItem';

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Adminisztrátor',
    name: 'Pötörke Csilla'
};

const items = [
    {
        href: '/admin/dashboard',
        icon: DashboardIcon,
        title: 'Vezérlőpult'
    },
    {
        href: '/admin/tagok',
        icon: UsersIcon,
        title: 'Tagok'
    },
    {
        href: '/admin/szolgaltatasok',
        icon: SettingsIcon,
        title: 'Szolgáltatások'
    },
    {
        href: '/admin/kiegeszito-szolgaltatasok',
        icon: ExtensionIcon,
        title: 'Kieg. szolgáltatások'
    },
    {
        href: '/admin/dijcsomagok',
        icon: AttachMoneyIcon,
        title: 'Díjcsomagok'
    },
    {
        href: '/admin/fizetesi-modok',
        icon: CreditCardIcon,
        title: 'Fizetési módok'
    },
    {
        href: '/admin/nyelvek',
        icon: FlagIcon,
        title: 'Nyelvek'
    },
    {
        href: '/admin/csoportok',
        icon: GroupsIcon,
        title: 'Csoportok'
    },
    {
        href: '/admin/velemenyek',
        icon: ThumbUpIcon,
        title: 'Vélemények'
    },
    // {
    //     href: '/admin/telepulesek',      // bugos, kivéve
    //     icon: PlaceIcon,
    //     title: 'Települések'
    // }
];

const useStyles = makeStyles(() => ({
    mobileDrawer: {
        width: 256
    },
    desktopDrawer: {
        width: 256,
        top: 64,
        height: 'calc(100% - 64px)'
    },
    avatar: {
        cursor: 'pointer',
        width: 64,
        height: 64
    }
}));

const NavBar = ({onMobileClose, openMobile}) => {
    const classes = useStyles();
    const location = useLocation();

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname]);

    const content = (
        <Box
            height="100%"
            display="flex"
            flexDirection="column"
        >
            <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                p={2}
            >
                <Avatar
                    className={classes.avatar}
                    component={RouterLink}
                    src={user.avatar}
                    to="/app/account"
                />
                <Typography
                    className={classes.name}
                    color="textPrimary"
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.jobTitle}
                </Typography>
            </Box>
            <Divider/>
            <Box p={2}>
                <List>
                    {items.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    classes={{paper: classes.mobileDrawer}}
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden mdDown>
                <Drawer
                    anchor="left"
                    classes={{paper: classes.desktopDrawer}}
                    open
                    variant="persistent"
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

NavBar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

NavBar.defaultProps = {
    onMobileClose: () => {
    },
    openMobile: false
};

export default NavBar;
