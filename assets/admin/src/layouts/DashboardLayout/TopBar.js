import {
    AppBar,
    Box,
    Hidden,
    IconButton,
    Toolbar
} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';

import classes from './TopBar.scss';

const TopBar = ({
                    className,
                    onMobileNavOpen,
                    ...rest
                }) => {
    // const classes = useStyles();
    const [notifications] = useState([]);

    function logoutHandler() {
        localStorage.setItem('user', '');
        history.push('/');
        location.reload();
    }

    return (
        <AppBar
            className={clsx(className)}
            elevation={0}
            {...rest}
        >
            <Toolbar>
                <RouterLink className={classes.Link} to="/admin/dashboard">
                    TUTI Bébiszitter Közvetítő
                </RouterLink>
                <Box flexGrow={1}/>
                <Hidden mdDown>
                    <a href="#" className={classes.Link} onClick={e => logoutHandler(e)}>Kijelentkezés</a>
                    <RouterLink to="/admin/logout">
                        <InputIcon className={['m-1', classes.Icon].join(' ')}/>
                    </RouterLink>
                </Hidden>
                <Hidden lgUp>
                    <IconButton
                        color="inherit"
                        onClick={onMobileNavOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

TopBar.propTypes = {
    className: PropTypes.string,
    onMobileNavOpen: PropTypes.func
};

export default TopBar;
