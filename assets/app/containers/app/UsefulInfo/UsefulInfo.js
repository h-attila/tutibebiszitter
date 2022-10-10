import React, {Component} from 'react';

import Article from '../../../components/Article/Article';
import Testimonials from "../../../components/Testimonials/Testimonials";
import classes from "./UsefullInfo.scss";

class UsefulInfo extends Component {
    render() {
        return (
            <div className={["contact-page", classes.UsefulInfo].join(' ')}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm text-center">
                            <h1>Hasznos infók - TUTI bébiszitter-közvetítő</h1>
                            <div className="mt-3">
                                <section>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <article>
                                                    <Article title="useful-info" />
                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col">

                            <Testimonials testimonials={this.props.testimonials} />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsefulInfo;