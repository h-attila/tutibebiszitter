import React from 'react';

import classes from './Item.scss';

import Badge from './Badge/Badge';

const item = (props) => {
    let badges = [];

    for (let i = 0; i < props.services.length; i++) {
        badges.push(<Badge key={i}>{props.services[i].label}</Badge>);
    }

    return (
        <div className={[classes.Item, "mb-3 d-flex"].join(' ')}>

            <div className={[classes.Thumbnail, "d-flex justify-content-center"].join(' ')}>
                {/*<img src={props.image} alt={props.name}/>*/}
                <img className={classes.Img} src="upload/testimonials/kecskemeti_zsuzsi.jpeg" alt={props.name}/>
            </div>

            <div className={[classes.InfoBox, "m-3 d-flex flex-column"].join(' ')}>
                <div>
                    <h5 className="card-title">{props.name}</h5>
                    <hr/>
                    <div className="search-results__badges">
                        {badges}
                    </div>
                    <div className="text-justify my-2">
                        <p className="m-0">
                            {props.shortIntroduction}
                        </p>
                    </div>
                </div>
                <div className={"mt-auto"}>
                    <div>
                        <small className="d-flex text-muted">
                        <span className="search-item__card-address mb-0 pb-0 mr-4">
                            <i className="fa fa-home mr-1" aria-hidden="true"/>{props.pubAddress}
                        </span>
                        <span className="search-item__card-phone ml-auto mb-0 pb-0">
                            <i className="fa fa-phone-square mr-1" aria-hidden="true"/>{props.phone}
                        </span>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default item;