import React, { Component } from 'react'
import { ajax } from "../../utilities/request"

const logErrorToMyService = (error, info) => {

    ajax('remove_cart_item', { error: error, info: info }, 'GET', true, true)
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
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong. Please refresh the page and try again.</h1>;
        }
        return this.props.children;
    }
}

