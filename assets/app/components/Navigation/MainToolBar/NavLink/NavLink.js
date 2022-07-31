import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavLink.module.scss';

const navLink = (props) => {
    return (
    <li>
        <NavLink
            className={classes.NavLink}
            to={props.href}
            exact
            activeClassName="active"
            >{props.children}</NavLink>
    </li>
)};

export default navLink;