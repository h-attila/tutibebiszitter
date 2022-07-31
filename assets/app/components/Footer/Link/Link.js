import React from 'react';
import {Link} from 'react-router-dom';

const link = (props) => (
    <Link to={props.to}>{props.name}</Link>
);

export default link;