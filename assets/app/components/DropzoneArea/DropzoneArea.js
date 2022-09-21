import {DropzoneArea} from 'material-ui-dropzone'
import React, {Component} from 'react'

class DropzoneAreaExample extends Component{
    constructor(props){
        super(props);
        this.state = {
            files: []
        };
    }
    handleChange(files){
        this.setState({
            files: files
        });
    }
    render(){
        return (
            <DropzoneArea
                onChange={this.handleChange.bind(this)}
            />
        )
    }
}

export default DropzoneAreaExample;