import {Box, Button, Card, CardContent, InputAdornment, makeStyles, SvgIcon, TextField} from '@material-ui/core';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoodIcon from '@material-ui/icons/Mood';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import React, {Component} from 'react';
import {Search as SearchIcon} from 'react-feather';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

class Toolbar extends Component {

    state = {
        activeBtn: null
    }

    componentDidMount() {
        this.setState({activeBtn: this.props.activeBtn});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.activeBtn === this.props.activeBtn) {
            return;
        }
        this.setState({activeBtn: this.props.activeBtn});
    }

    handleClick(status) {
        this.props.onToolbarChange(status);
    }

    // const classes = useStyles();

    // console.log("»» toolbar rest", rest);

    render() {
        return (
            <div>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Button style={{margin: ".25rem"}} variant={this.state.activeBtn === 'new' ? "contained" : "outlined"} onClick={() => this.handleClick('new')} color="primary" size="small"
                            startIcon={<PersonAddIcon/>}>
                        Újak
                    </Button>
                    <Button style={{margin: ".25rem"}} variant={this.state.activeBtn === 'active' ? "contained" : "outlined"} onClick={() => this.handleClick('active')} color="primary" size="small"
                            startIcon={<MoodIcon/>}>
                        Aktívak
                    </Button>
                    <Button style={{margin: ".25rem"}} variant={this.state.activeBtn === 'inactive' ? "contained" : "outlined"} onClick={() => this.handleClick('inactive')} color="primary" size="small"
                            startIcon={<SentimentVeryDissatisfiedIcon/>}>
                        Inaktívak
                    </Button>
                    <Button style={{margin: ".25rem"}} variant={this.state.activeBtn === 'highlighted' ? "contained" : "outlined"} onClick={() => this.handleClick('highlighted')} color="primary" size="small"
                            startIcon={<FavoriteIcon/>}>
                        Kiemeltek
                    </Button>
                    <Button style={{margin: ".25rem"}} variant={this.state.activeBtn === 'nearexpire' ? "contained" : "outlined"} onClick={() => this.handleClick('nearexpire')} color="primary" size="small"
                            startIcon={<AvTimerIcon/>}>
                        Lejárók
                    </Button>
                    <Button style={{margin: ".25rem"}} variant={this.state.activeBtn === 'edited' ? "contained" : "outlined"} onClick={() => this.handleClick('edited')} color="primary" size="small"
                            startIcon={<EditIcon/>}>
                        Módosultak
                    </Button>
                    <Button style={{margin: ".25rem"}} variant={this.state.activeBtn === 'all' ? "contained" : "outlined"} onClick={() => this.handleClick('all')} color="primary" size="small"
                            startIcon={<AllInclusiveIcon/>}>
                        Összes
                    </Button>
                </Box>
                <Box mt={3}>
                    <Card>
                        <CardContent>
                            <Box maxWidth={500}>
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SvgIcon
                                                    fontSize="small"
                                                    color="action"
                                                >
                                                    <SearchIcon/>
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder="Név keresése"
                                    variant="outlined"
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        )
    }
}

export default Toolbar;
