import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import React from "react";

// function ProfileDetails(props) {
export default function ProfileDetails(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="ProfileDetails"
            hidden={value !== index}
            id={`scrollable-auto-ProfileDetails-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
