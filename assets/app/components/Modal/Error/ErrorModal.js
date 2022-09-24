import React from "react";
import {connect} from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import * as actionCreators from "../../../store/actions/actions";
import {compile} from "sass";
// import clearError from '../actions/clearError'

class ErrorModal extends React.Component {

    state = {
        show: false
    };


    onClick = (e) => {
        this.setState({
            show: false
        });
    };

    componentDidUpdate(prevProps) {
        console.log('»» prevProps', this.props, prevProps);
        if (this.props.error && !prevProps.error) {
            this.setState({
                show: true
            });
        }

    }

    render() {

        if(!this.state.show){
            return null;
        }

        let MySwal = withReactContent(Swal);

        MySwal.fire({
            icon: 'error',
            text: this.props.error ?? 'Hiba történt, kérlek, ellenőrid, és próbáld újra',
        })

        return null;
    }
}

function mapStateToProps(state) {
    return {error: state.error}
}

const mapDispatchToProps = dispatch => {
    return {
        onClearError: (event, target) => dispatch(actionCreators.onClearError(event, target)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal)