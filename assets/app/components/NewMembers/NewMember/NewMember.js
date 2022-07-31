import React from 'react';

import classes from './NewMember.scss';

const newMember = (props) => (
    <div className={classes.NewMember}>
        <img className={[classes.Profile, "shadow"].join(' ')} src={"/upload/testimonials/" + props.image} alt={props.name}/>
        <h3 className={classes.Name}>{props.name}</h3>
        <p className={classes.Description}>{props.description}</p>
        <p className={[classes.Address, "address mb-0 mt-2 pb-0"].join(' ')}>
            <i className="fa fa-home mr-2" aria-hidden="true"/>{props.place}
        </p>
    </div>
);

export default newMember;