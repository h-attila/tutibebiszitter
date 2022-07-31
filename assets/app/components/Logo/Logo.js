import React from "react";

import MenuImg from '../../images/menu_img.jpg';
import classes from './Logo.css';

const logo = () => (
    <img className={[classes.Logo, "navbar-img", "d-none", "d-lg-block", "rounded-circle", "shadow"].join(' ')} src={MenuImg} alt="tutibebiszitter.hu"/>
);

export default logo;