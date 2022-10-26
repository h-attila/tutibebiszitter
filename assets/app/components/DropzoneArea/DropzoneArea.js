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
                filesLimit={1}
                acceptedFiles={['image/*']}
                dropzoneText={"Húzd ide a fájlt, vagy kattints ide a feltöltés ablak megnyitásához"}
                maxFileSize={5000000}
            />
        )
    }
}

export default DropzoneAreaExample;