import React from 'react';
import classes from './SubToolBar.module.scss';

import NavLink from './NavLink/NavLink';

const subToolBar = () => (
    <nav className={[classes.SubToolBar, "d-none d-sm-inline-flex fixed-top navbar-expand-sm navbar-light w-100 flex-row-reverse"].join(' ')}>
        <ul className="navbar-nav">
            <NavLink href="/jelentkezem-bebiszitternek">Jelentkezem bébiszitternek</NavLink>
            <NavLink href={"/bejelentkezes"}>Belépés tagoknak</NavLink>
        </ul>
    </nav>
);

export default subToolBar;

