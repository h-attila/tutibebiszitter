import React from 'react';
import Badge from '@mui/material/Badge';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MapIcon from '@mui/icons-material/Map';
import SavingsIcon from '@mui/icons-material/Savings';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';


import classes from './Item.scss';

const item = (props) => {
    let badges = [];
    let cardClass = null;
    if (props.newMember) {
        badges.push(<Badge key='newMember' className={[classes.Badge, classes.Orange].join(' ')}><NewReleasesIcon
            fontSize='small' className={[classes.White, 'mr-1'].join(' ')}/>Új tag</Badge>);
        cardClass = classes.CardHighlighted;
    }
    if (props.highlighted) {
        badges.push(<Badge key='highlighted' className={[classes.Badge, classes.Orange].join(' ')}><LoyaltyIcon
            fontSize='small' className={[classes.White, 'mr-1'].join(' ')}/>Kiemelt</Badge>);
        cardClass = classes.CardHighlighted;
    }

    for (let i = 0; i < props.services.length; i++) {
        badges.push(<Badge key={i}
                           className={[classes.Badge, classes.Normal].join(' ')}>{props.services[i].label}</Badge>);
    }

    let title = props.name;
    if (props.label) {
        title += ' - ' + props.label;
    }

    return (<div className={[classes.Item, cardClass, "mb-2 d-flex"].join(' ')}>

        <div className={[classes.Thumbnail, "d-flex justify-content-center"].join(' ')}>
            <img className={classes.Img} src="upload/testimonials/kecskemeti_zsuzsi.jpeg" alt={props.name}/>
        </div>

        <div className={[classes.InfoBox, "m-2 d-flex flex-column"].join(' ')}>
            <div>
                <Link href={`../bebiszitter/${props.slug}`} className={classes.Link}>
                    <h5 className={classes.Title}>{title}</h5>
                </Link>
                <hr className="mb-2 mt-2"/>
                <div>
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
                    <Box className="mb-0 pb-0 mr-2">
                        <p className={classes.SubInfo}>
                            <MapIcon className='mr-1' fontSize="small"/>{props.pubAddress}
                        </p>
                        <p className={classes.SubInfo}>
                            <SavingsIcon className='mr-1' fontSize="small"/>{props.hourlyRate}
                        </p>
                    </Box>
                    <Box className="ml-auto" sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        alignItems: 'flex-end',
                        mr: 0,
                        mt: 1,
                        mb: 0
                    }}>
                        <Button variant="outlined" size="small">Megnézem<KeyboardDoubleArrowRightIcon
                            fontSize="small"/></Button>
                    </Box>
                </div>
            </div>
        </div>
    </div>);
}

export default item;