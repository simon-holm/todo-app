import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

//Task component - represents a single item
export default class Task extends Component {
    toggleChecked() {
        //set the checked property to the opposite of its current value
        Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
    }

    deleteThisTask() {
        Meteor.call('tasks.remove', this.props.task._id);
    }

    togglePrivate() {
        Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
    }

    render () {
        // give tasks different className when checked off &/or private
        const taskClassName = classnames("collection-item", {
            checked: this.props.task.checked,
            private: this.props.task.private,
        });

        const privateButtonClassName = classnames("waves-effect waves-light btn right privbtn", {
            privatemarked: this.props.task.private,
        });

        return (
            <li className={taskClassName}>
                <button className="waves-effect waves-light btn-large delete" onClick={this.deleteThisTask.bind(this)}>
                    &times;
                </button>

                <span className="text"><strong>{this.props.task.username}</strong>: {this.props.task.text}</span>

                { this.props.showPrivateButton ? (
                            <a className={privateButtonClassName} onClick={this.togglePrivate.bind(this)}>
                                { this.props.task.private ? 'Private' : 'Public' }
                            </a>
                        ) : '' }

                <form action="#" className="checkboxes">
                    <p>
                        <input
                            type="checkbox"
                            id={this.props.task._id}
                            readOnly
                            checked={this.props.task.checked}
                            onClick={this.toggleChecked.bind(this)}
                        />
                        <label htmlFor={this.props.task._id}></label>   
                    </p>
                </form>   
                
            </li>
        );
    }
}

Task.PropTypes = {
    /*  This component receives the tasks to display through a prop.
        We can use propTypes to indicate it is required */
    task: PropTypes.object.isRequired,
    showPrivateButton: React.PropTypes.bool.isRequired,
};