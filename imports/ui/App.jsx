import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import Nav from './Nav.jsx';

//App component - represent the whole App
class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
        hideCompleted: false,
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        //Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

        Tasks.insert({
            text,
            createdAt: new Date(), //grab current time
        });

        //Clear the form
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
                        <div className="card z-depth-1">
                            <div className="card-content col s8 right-align">
                                <form onSubmit={this.handleSubmit.bind(this)} >
                                    <input
                                    type="text"
                                    ref="textInput"
                                    placeholder="Enter new task"
                                    />
                                    <button type="submit" className="waves-effect waves-light btn">Add</button>
                                </form>
                            </div>
                        </div>
                    <ul className="collection with-header z-depth-1">
                        <li className="collection-header">
                            <h4>Todo List ({this.props.incompleteCount})</h4>
                            <div className="toolbar">
                                <span>Hide Completed Tasks</span>
                                <input
                                    type="checkbox"
                                    id="hider"
                                    readOnly
                                    checked={this.state.hideCompleted}
                                    onClick={this.toggleHideCompleted.bind(this)}
                                />
                                <label htmlFor="hider" className="hidetoggle"></label>
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
};

export default createContainer(() => {
    return {
        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
}, App);