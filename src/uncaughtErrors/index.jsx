import React from 'react'
import ReactDOM from 'react-dom'


export default class UncaughtErrors extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false}
    }

    static getDerivedStateFormError(error) {
        return {hasError : true}
    }
    componentDidCatch(error, info) {
        //logError
    }
    render() {
        if (this.state.hasError) {
            return <h1>someting went wrong</h1>
        }
        return this.props.children
    }
}

