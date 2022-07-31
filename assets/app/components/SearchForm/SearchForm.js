import React, {Component} from 'react';
import {connect} from 'react-redux';

import SelectItem from './SelectItem/SelectItem';
import * as actionCreators from '../../store/actions/actions';
import Spinner from '../UI/Spinner/Spinner';
import { Search } from 'react-bootstrap-icons';

import classes from './SearchForm.scss';

class SearchForm extends Component {
    state = {
        button: {
            disabled: ''
        }
    }

    componentDidMount() {
        if (this.props.searchInit) return;
        this.props.onSearchFormInit();
    }

    render() {
        let searchForm;
        let disabled;

        if (this.props.searching) {
            disabled = {disabled: 'disabled'}
        } else {
            disabled = {}
        }

        console.log('»» search form render', this.props);

        if (this.props.searchInit) {
            searchForm = (
                <div className="row text-center m-3">
                    <div className="col-sm-12 col-md-6 p-1">

                        <SelectItem name='service' placeholder='Életkor' options={this.props.optionsService} selected={this.props.selectedService}
                                    change={(event) => this.props.onSearchItemChanged('service', event)}/>

                    </div>
                    <div className="col-sm-12 col-md-6 p-1">

                        <SelectItem name='place' placeholder='Település' options={this.props.optionsPlace} selected={this.props.selectedPlace}
                                    change={(event) => this.props.onSearchItemChanged('place', event)}/>

                    </div>
                    <div className="col-sm-12 col-md-6 p-1">

                        <SelectItem name='group' placeholder='Csoport méret' options={this.props.optionsGroup} selected={this.props.selectedGroup}
                                    change={(event) => this.props.onSearchItemChanged('group', event)}/>

                    </div>
                    <div className="col-sm-12 col-md-6 p-1">

                        <SelectItem name='language' placeholder='Beszélt nyelv' options={this.props.optionsLanguage} selected={this.props.selectedLanguage}
                                    change={(event) => this.props.onSearchItemChanged('language', event)}/>

                    </div>
                    <div className="col-sm-12 col-md-6 p-1">

                        <SelectItem name='handicapped' placeholder='Speciális nevelési igényű' options={this.props.optionsHandicap} selected={this.props.selectedHandicap}
                                    change={(event) => this.props.onSearchItemChanged('handicap', event)}/>

                    </div>
                    <div className="col-sm-12 col-md-6 p-1 text-center">

                        <button type="button" className={[classes.Button, "btn", "btn-sm", "text-uppercase", "w-75"].join(' ')} onClick={this.props.onSearchFormSubmit} {...disabled} >
                            keresés <span className="ml-1"><Search /></span>
                        </button>

                    </div>
                </div>
            );
        } else {
            searchForm = (
                <div className="row text-center m-3">
                    <div className="col p-1">
                        <Spinner/>
                    </div>
                </div>
            );
        }

        return (
            <form name="search_form" method="post" id="searchForm" className="searchForm text-center w-100" noValidate="novalidate">
                {searchForm}
            </form>
        );
    }
}


const mapStateToProps = state => {

    console.log('»» searchForm state', state);

    return {
        searchInit: state.search.init,
        searching: state.search.searching,
        optionsService: state.search.options.service,
        optionsPlace: state.search.options.place,
        optionsGroup: state.search.options.group,
        optionsLanguage: state.search.options.language,
        optionsHandicap: state.search.options.handicap,
        selectedService: state.search.searchParams.service,
        selectedPlace: state.search.searchParams.place,
        selectedGroup: state.search.searchParams.group,
        selectedLanguage: state.search.searchParams.language,
        selectedHandicap: state.search.searchParams.handicap
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSearchItemChanged: (i, v) => dispatch(actionCreators.searchItemChanged(i, v)),
        onSearchFormSubmit: () => dispatch(actionCreators.searchFormSubmit()),
        onSearchFormInit: () => dispatch(actionCreators.searchFormInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);