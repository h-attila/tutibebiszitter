import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ReCaptcha extends Component {
    constructor(props) {
        super(props)

        this.loadRecaptcha = this.loadRecaptcha.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        if (document.readyState === 'complete') {
            // Window was already loaded (the component is rendered later on)
            // ReCaptacha can be safely loaded
            this.loadRecaptcha()
        } else {
            // Wait that the window gets loaded to load the ReCaptcha
            window.onload = this.loadRecaptcha
        }
    }

    getValue() {
        window.grecaptcha.getResponse(this.recatchaElt)
    }

    loadRecaptcha() {
        const { id, apiKey, theme } = this.props

        this.recatchaElt = window.grecaptcha.render(id, {
            sitekey: apiKey,
            theme,
            callback: this.handleChange,
        })
    }

    handleChange() {
        const { onChange } = this.props

        onChange(this.getValue())
    }

    render() {
        const { id } = this.props

        return <div id={id} />
    }
}

ReCaptcha.propTypes = {
    id: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    theme: PropTypes.oneOf(['dark', 'light']),
}

ReCaptcha.defaultProps = {
    theme: 'light',
}

export default ReCaptcha