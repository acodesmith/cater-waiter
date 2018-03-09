import React, { Component } from 'react'
import { ClearData } from './clear_data'

const logErrorToMyService = (error, info) => {

    // @todo
    // ajax('log_error', { error: error, info: info }, 'GET', true, true)
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {

        // Display fallback UI
        this.setState({ hasError: true });

        // You can also log the error to an error reporting service
        logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError)
            return <ClearData labels={this.props.labels} />

        return this.props.children;
    }
}

export { ErrorBoundary }