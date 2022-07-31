import React, {Component} from 'react';

import Article from '../../../components/Article/Article';
import {connect} from "react-redux";
import history from "../../../store/history/history";
import * as actionCreators from "../../../store/actions/actions";

class ThankYou extends Component {

    componentDidMount() {
        // ha nem engedélyezett, akkor a címlapra irányítjuk
        if (!this.props.successRegistration) {
            history.push('/');
        }

        // sikeres jelentkezés után tiltjuk a sikeres jelentkezés oldalt, és elérhetővé tesszük a formot.
        this.props.registrationFormReset();
    }

    render() {
        return (
            <div className="useful-info-page">
                <div className="container">
                    <div className="row">
                        <div className="col-sm text-center">
                            <h1>Sikeres jelentkezés</h1>
                            <div className="mt-3">
                                <section>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col">
                                                <article>

                                                    <Article title="registration-thankyou" />

                                                </article>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        successRegistration: state.registration.successRegistration
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registrationFormReset: () => dispatch(actionCreators.registrationFormReset()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);