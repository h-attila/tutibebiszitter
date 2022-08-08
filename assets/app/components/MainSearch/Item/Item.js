import React from 'react';
import Badge from '@mui/material/Badge';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';


import classes from './Item.scss';

const item = (props) => {
    let badges = [];
    let cardClass = null;
    if (props.newMember) {
        badges.push(<Badge key='newMember' className={[classes.Badge, classes.Orange].join(' ')}><NewReleasesIcon fontSize='small' className={[classes.White, 'mr-1'].join(' ')} />Új tag</Badge>);
        cardClass = classes.CardHighlighted;
    }
    if (props.highlighted) {
        badges.push(<Badge key='highlighted' className={[classes.Badge, classes.Orange].join(' ')}><LoyaltyIcon fontSize='small' className={[classes.White, 'mr-1'].join(' ')}/>Kiemelt</Badge>);
        cardClass = classes.CardHighlighted;
    }

    for (let i = 0; i < props.services.length; i++) {
        badges.push(<Badge key={i} className={[classes.Badge, classes.Normal].join(' ')}>{props.services[i].label}</Badge>);
    }

    return (
        <div className={[classes.Item, cardClass, "mb-3 d-flex"].join(' ')}>

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
                    <div className="d-flex text-muted">
                        <span className="search-item__card-address mb-0 pb-0 mr-4">
                            <PlaceIcon className='mr-1' />{props.pubAddress}
                        </span>
                        <span className="search-item__card-phone ml-auto mb-0 pb-0">
                            <CallIcon className='mr-1' />{props.phone}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default item;