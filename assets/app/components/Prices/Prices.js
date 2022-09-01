import axios from 'axios';
import React, {Component} from 'react';

import Spinner from "../UI/Spinner/Spinner";
import Item from './Item/Item';
import classes from './Prices.scss';


class Prices extends Component {
    state = {
        items: null,
        init: false,
        loading: false
    }

    getPrices() {
        this.setState({loading: true});
        axios
            .get('/api/packages/packages-init')
            .then(response => {
                this.setState({items: response.data, init: true, loading: false});
            });
    }

    componentDidMount() {
        if (!this.state.items) {
            this.getPrices();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.init;
    }

    render() {
        let items = null;
        if (this.state.items) {
            items = this.state.items.map(item => {
                return (<Item {...item} key={item.id}/>);
            });
        } else if (this.state.loading) {
            items = (<Spinner/>);
        }

        return (
            <div className={[classes.Prices, "row"].join(' ')}>
                <div className="col">
                    <article className="prices">
                        <div className="row d-flex flex-row">
                            {items}
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className={[classes.Success, "note mt-4"].join(' ')}>
                                    <strong>Figyelem!</strong> A díj akár már az első felügyelet esetén
                                    megtérül, így ha csak egyetlen egy megkeresésed lesz a honlapon keresztül, már akkor is bőven megéri!
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
}

export default Prices;