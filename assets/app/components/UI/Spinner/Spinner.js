import React from 'react';

import spinnerImg from '../../../images/spinner.gif';
import classes from './Spinner.scss';

const spinner = () => (
    <div className="w-100">
        <div className="text-center">
            <div className={classes.Img} style={{backgroundImage: "url(" + spinnerImg + ")"}}></div>
        </div>
    </div>
);

export default spinner;