import React, { Component, PropTypes } from 'react';

//Task component - represents a single item
export default class Task extends Component {
    render () {
        return (
            <li>{this.props.task.text}</li>
        );
    }
}

Task.PropTypes = {
    /*  This component receives the tasks to display through a prop.
        We can use propTypes to indicate it is required */
    task: PropTypes.object.isRequired,
};