import React, {Component} from 'react';
import Select from 'react-select';

class SelectItem extends Component {
    state = {
        isClearable: true,
        isDisabled: false,
        isLoading: false,
        isRtl: false,
        isSearchable: true,
        isMulti: false
    };

    font = this.props.font ?? 'Poppins';

    colourStyles = {
        control: styles => ({...styles, fontWeight: '300', fontFamily: this.font, color: '#60135E', borderColor: '#60135E'}),
        input: styles => ({...styles, fontWeight: '300', fontFamily: this.font, color: '#60135E'}),
        placeholder: styles => ({...styles, fontWeight: '300', fontFamily: this.font, color: '#60135E'}),
        option: (styles, { isSelected }) => {
            return {
                ...styles,
                backgroundColor: isSelected ? '#60135E' : '#ffffff',
                color: isSelected ? '#FFFFFF' : '#60135E',
            }
        }
    };

    componentDidMount() {
        if (this.props.isMulti) {
            this.setState({isMulti: true})
        }
    }

    render() {
        return (
            <Select
                value={this.props.selected}
                name={this.props.id}
                onChange={this.props.change}
                options={this.props.options}
                placeholder={this.props.placeholder}
                styles={this.colourStyles}
                {...this.state}
            />
        );
    }

}

export default SelectItem;