import React from 'react';
import classes from './MainToolBar.scss';

import NavLink from './NavLink/NavLink';

const mainToolBar = () => (
    <nav className={[classes.MainToolBar, "navbar navbar-main fixed-top navbar-expand-md shadow"].join(' ')}>
        <div className="collapse navbar-collapse" id="navbarSupportedContent1">
            <ul className="navbar-nav justify-content-center w-100">
                <NavLink href={"/"}>Kezdőlap</NavLink>
                <NavLink href={"/bebiszittert-keresek"}>Bébiszittert keresek</NavLink>
                <NavLink href={"/bebiszitter-vagyok"}>Bébiszitter vagyok</NavLink>
                <NavLink href={"/hasznos-infok"}>Hasznos infók</NavLink>
                <NavLink href={"/kapcsolat"}>Kapcsolat</NavLink>
            </ul>
        </div>
    </nav>
);

export default mainToolBar;