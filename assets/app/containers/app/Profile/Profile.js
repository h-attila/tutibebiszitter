import React, {Component} from 'react';
import {connect} from "react-redux";
import axios from "axios";

class RegistrationForm extends Component {

    componentDidMount() {
        console.log('>> Profile before');
        console.log('>> Profile', this.state);
    }

    render () {

        return (
            'Hello World'
        );
    }
}

const mapStateToProps = state => {
    return {
        // services: state.search.options.service,
        // places: state.search.options.place,
        // languages: state.search.options.language,
        // packages: state.packages,
        // submitDisabled: state.registration.submitDisabled,
        // formErrors: state.registration.formErrors,
        // successRegistration: state.registration.successRegistration
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // packagesInit: () => dispatch(actionCreators.packagesInit()),
        // servicesInit: () => dispatch(actionCreators.searchFormInit()),
        // registrationFormSubmit: (formData) => dispatch(actionCreators.registrationFormSubmit(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
