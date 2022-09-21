import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import * as actionCreators from "../../store/actions/actions";
import SearchForm from '../SearchForm/SearchForm';
import Spinner from '../UI/Spinner/Spinner';
import Item from './Item/Item';
import classes from './MainSearch.scss';

class MainSearch extends Component {

    render() {
        let result = <h5 className="text-center">Add meg a keresési feltételeket.</h5>;
        if (!this.props.init || this.props.searching) {

            result = <Spinner/>;

        } else if (this.props.nbResults > 0) {

            result = this.props.result.map((result) => {
                return (
                    <Item key={result.id} {...result} />
                );
            });

        } else {
            result = <h5 className="text-center mb-5">Nincs találat, kérlek add meg, vagy módosítsd a keresési feltételeket.</h5>;
        }

        let pagination = null;
        if (this.props.haveToPaginate) {
            pagination = (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="következő >"
                    onPageChange={(event) => this.props.searchFormSubmit(event)}
                    pageRangeDisplayed={5}
                    pageCount={this.props.nbPages}
                    previousLabel="< előző"
                    renderOnZeroPageCount={null}
                    activeClassName={classes.Selected}
                />
            );
        }

        return (
            <Aux>
                <div className="row">
                    <div className="col">
                        <div className={classes.MainSearchForm}>

                            <SearchForm/>

                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className={[classes.SearchResultsContainer, "d-flex", "align-items-center", "flex-column", "mt-4"].join(' ')}>

                            {pagination}

                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="d-flex align-items-center flex-column mt-3 mb-2">

                            {result}

                        </div>
                    </div>
                </div>

            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        nbResults: state.search.pagination.nbResults,
        nbPages: state.search.pagination.nbPages,
        haveToPaginate: state.search.pagination.haveToPaginate,
        hasPreviousPage: state.search.pagination.hasPreviousPage,
        hasNextPage: state.search.pagination.hasNextPage,
        currentPage: state.search.pagination.currentPage,
        init: state.search.init,
        searching: state.search.searching,
        result: state.search.result
    }
};

const mapDispatchToProps = dispatch => {
    return {
        searchFormSubmit: (event) => dispatch(actionCreators.searchFormSubmit(event)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainSearch);
