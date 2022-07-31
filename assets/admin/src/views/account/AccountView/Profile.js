import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {Avatar, Box, Card, CardContent, makeStyles, Typography} from '@material-ui/core';
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        height: 160,
        width: 160
    }
}));

const Profile = ({className, profileName, profileImage, status, icon, ...rest}) => {
    const classes = useStyles();

    return (
        <Card className={clsx(classes.root, className)} {...rest} >
            <CardContent>
                <Box alignItems="center" display="flex" flexDirection="column">
                    <Avatar className={classes.avatar} src={profileImage}/>
                    <Box mt={1}>
                        <Typography olor="textPrimary" variant="h4" gutterBottom={false}>
                            {profileName}
                        </Typography>
                    </Box>
                    <Typography color="textSecondary" variant="body1">
                        bébiszitter
                    </Typography>

                    <Chip style={{backgroundColor: status.color}} color="primary" icon={icon} label={status.text}/>
                </Box>
            </CardContent>
        </Card>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;
