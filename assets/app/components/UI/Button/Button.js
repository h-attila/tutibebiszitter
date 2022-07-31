import React from 'react';
import classes from "./Button.scss";

const button = (props) => {

    let icon = '';
    if (props.icon) {
        icon = (<i className={["fa", props.icon, "ml-2"].join(' ')} />);
    }

    return (
        <button
            type="button"
            className={[classes.Button, props.class, "btn"].join(' ')}
            onClick={props.click}
        >
            {props.title}
            {icon}
        </button>
    );
}

export default button;