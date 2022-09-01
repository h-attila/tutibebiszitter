import React, {Component} from 'react';
import {connect} from 'react-redux';

import MainSearch from "../../../components/MainSearch/MainSearch";

class Search extends Component {

    render() {
        console.log('»» place', this.props.place);

        const place = this.props.place ? 'Bébiszitterek ' + this.props.place.label + ' területén' : 'Bébiszitterek keresése';
        return (
            <main className="search-page">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="text-center mt-5">
                                <h1 className="mt-3">Bébiszittert keresek - TUTI bébiszitter közvetítő</h1>
                                <h3 className="mt-1">{place}</h3>
                                <p className="text-justify">A legjobb helyen jársz, amennyiben bébiszitterre lenne szükséged. Nincs más dolgod, mint megadni
                                    néhány adatot a
                                    gyermeke(i)dre vonatkozóan és máris hozzájutsz a bébiszitter adatlapjához.
                                    Ha bárkit felhívsz, kérjük, jelezd az illető bébiszitternek, hogy a <a href="http://www.tutibebiszitter.hu"
                                                                                                           target="_blank" rel="noreferrer">www.tutibebiszitter.hu</a>
                                    oldalon találtad a hirdetését.</p>
                            </div>
                        </div>
                    </div>

                    <MainSearch />

                </div>
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        place: state.search.searchParams.place,
    }
};

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);