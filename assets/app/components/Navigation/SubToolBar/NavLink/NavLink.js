import React from 'react';

import classes from './NavLink.module.scss';

const navLink = (props) => {
    return (
    <li>
        <a className={classes.NavLink} href={props.href}>{props.children}</a>
    </li>
)};

export default navLink;