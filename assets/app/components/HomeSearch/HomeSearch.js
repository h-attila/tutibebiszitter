import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

import classes from './HomeSearch.scss';

const homeSearch = props => (
    <div className="col p-0">
        <div className={[classes.HomeSearchContainer, "d-flex justify-content-center align-items-center"].join(' ')}>
            <div className={[classes.HomeSearch, "w-100 m-3"].join(' ')}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 mt-3">
                            <h2 className={[classes.Title, "text-left mb-0"].join(' ')}>Bébiszittert keresel?</h2>
                        </div>

                        <SearchForm />

                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default homeSearch;