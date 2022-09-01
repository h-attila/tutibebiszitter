import StarIcon from '@material-ui/icons/Star';
import React from 'react';
import NumberFormat from 'react-number-format';

import classes from './Item.scss';

const Item = (props) => {
    let stars = [];
    for (let i=0; i<props.stars; i++) {
        stars.push(<StarIcon className={[classes.Orange, "ml-2 mr-2"].join(' ')} />);
    }
    return (
        <div className={[classes.Item, "col-xs-12 col-sm-6 col card text-center m-2"].join(' ')}>
            <div className="card-body">
                {stars}
                <h5 className="font-weight-bold mt-3">{props.label}</h5>
                <p className="text-center mt-2">
                    <b><NumberFormat value={props.price} displayType={'text'} thousandSeparator={true} /> Ft</b>
                </p>
                <p>
                    <small>{props.description}</small>
                </p>
            </div>
        </div>
    );
}

export default Item;