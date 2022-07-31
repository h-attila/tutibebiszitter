import React, {Component} from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

import Aux from '../../hoc/Aux';

class Article extends Component {
    state = {
        article: null,
        title: null,
        loading: false,
        init: false
    }

    getArticle(title) {
        if (this.state.init) { return }

        this.setState({loading: true});
        axios
            .get('/api/article/' + title)
            .then(response => {
                this.setState({article: response.data, title: title, init: true, loading: false});
            });
    }

    componentDidMount() {
        if (!this.state.article) {
            this.getArticle(this.props.title);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !this.state.init;
    }

    render() {
        let article = null;
        if (this.state.article) {
            article = ReactHtmlParser(this.state.article);
        } else if (this.state.loading){
            // article = (<Spinner/>);
            article = '';
        }

        return (
            <Aux>
                {article}
            </Aux>
        );
    }
}

export default Article;

