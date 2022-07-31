import React from 'react';

import classes from './Badge.scss';

const badge = (props) => (
    <span className={[classes.Badge, " badge badge-services mr-1"].join(' ')}>{props.children}</span>
);

export default badge;