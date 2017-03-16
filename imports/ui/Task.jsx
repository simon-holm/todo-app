import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

//Task component - represents a single item
export default class Task extends Component {
    toggleChecked() {
        //set the checked property to the opposite of its current value
        Tasks.update(this.props.task._id, {
            $set: { checked: !this.props.task.checked },
        });
    }

    deleteThisTask() {
        Tasks.remove(this.props.task._id);
    }

    render () {
        // give tasks different className when checked off
        const taskClassName = this.props.task.checked ? 'collection-item checked' : 'collection-item';

        return (
            <li className={taskClassName}>
                <button className="waves-effect waves-light btn-large delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <span className="text">{this.props.task.text}</span>

                <input
                    type="checkbox"
                    id={this.props.task._id}
                    readOnly
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked.bind(this)}
                />
            </li>
        );
    }
}

Task.PropTypes = {
    /*  This component receives the tasks to display through a prop.
        We can use propTypes to indicate it is required */
    task: PropTypes.object.isRequired,
};