import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import Nav from './Nav.jsx';

//App component - represent the whole App
class App extends Component {
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

    renderTasks() {
        return this.props.tasks.map((task) => (
            <Task key={task._id} task={task} />
        ));
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className="container">
                    <header>
                        <h2>Epic ToDo App</h2>
                        <div className="card">
                            <div className="card-content col s8">
                                <form onSubmit={this.handleSubmit.bind(this)} >
                                    <input
                                    type="text"
                                    ref="textInput"
                                    placeholder="Enter new task"
                                    />
                                    <button type="submit">Add</button>
                                </form>
                            </div>
                        </div>
                    </header>
                    <ul className="collection with-header">
                        <li className="collection-header"><h4>Todo List</h4></li>
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
    };
}, App);