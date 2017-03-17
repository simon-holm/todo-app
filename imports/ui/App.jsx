import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

import Task from './Task.jsx';
import Nav from './Nav.jsx';


class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        hideCompleted: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username,
        });

        ReactDOM.findDOMNode(this.refs.textInput).value = '';
    }

    toggleHideCompleted() {
        this.setState({
        hideCompleted: !this.state.hideCompleted,
        });
    }

    renderTasks() {
        let filteredTasks = this.props.tasks;
        if (this.state.hideCompleted) {
        filteredTasks = filteredTasks.filter(task => !task.checked);
        }
        return filteredTasks.map((task) => (
            <Task key={task._id} task={task} />
        ));

        
    }
    
    render() {
        return (
            <div>
                <Nav/>
                <div className="container">
                    <h3>What's on your list today?</h3>
                    <div className="chip">
                        <AccountsUIWrapper />
                    </div>
                    <div className="card z-depth-1">
                    { this.props.currentUser ?
                        <div className="card-content right-align">
                            <form onSubmit={this.handleSubmit.bind(this)} >
                                <input
                                    type="text"
                                    ref="textInput"
                                    placeholder="Enter a new task!"
                                />
                                <button type="submit" className="waves-effect waves-light btn">Add</button>
                            </form>
                        </div>
                        : //If not logged in - show below
                        <div className="card-content center-align">
                            <span className="card-title">Not Logged in!</span>
                            <p>Your ToDo list is unique to your account. Please login in order to see and edit your tasks.</p>
                        </div>
                    }
                    </div> 
                        
                    <ul className="collection with-header z-depth-1">
                        <li className="collection-header">
                            <h4>Todo List ({this.props.incompleteCount})</h4>
                            <div className="toolbar">
                                <div className="switch">
                                    <label>
                                        Show
                                        <input 
                                            type="checkbox"
                                            checked={this.state.hideCompleted}
                                            onClick={this.toggleHideCompleted.bind(this)}
                                        />
                                        <span className="lever"></span>
                                        Hide
                                    </label>
                                </div>
                            </div>
                        </li>
                        {this.renderTasks()}
                    </ul>
                </div>
            </div>
        );
    }
}

App.PropTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    currentUser: PropTypes.object,
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
        currentUser: Meteor.user(),
    };
}, App);