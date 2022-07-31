import React from 'react';

import classes from './Item.scss';

const item = (props) => {
    let a = props.active ? classes.Active : null;

    return (
        <li className={[classes.Item, a, "pagination, page-item"].join(' ')} aria-current="page">
            <a className={[classes.Link, "page-link"].join(' ')} href="#">{props.current}</a>
        </li>
    );
}

export default item;