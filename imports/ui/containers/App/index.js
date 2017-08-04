import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ToDoInput from '../../components/ToDoInput';
import ToDoItem from '../../components/ToDoItem';
import ToDoCount from '../../components/ToDoCount';
import ClearButton from '../../components/ClearButton';
import { ToDos } from '../../../api/todos';
import AccountsUIWrapper from '../../components/AccountsUIWrapper/';
import './styles.css';


class App extends Component {
  constructor(props) {
    super(props);
  }

  // Toggle the checkbox to denote completion status
  toggleComplete = (item) => {
    Meteor.call('todos.toggleComplete', item);
  }

  // Remove a todo item from the list
  removeToDo = (item) => {
    Meteor.call('todos.removeTodo', item);
  }

  // Remove all completed todos from the list
  removeCompleted = () => {
    Meteor.call('todos.removeCompleted');
  }

  // Check if any of the todos are completed
  hasCompleted() {
    const completed = this.props.todos.filter((todo) => todo.complete);
    return completed.length > 0 ? true : false;
  }

  // Add a todo item
  addToDo = (event) => {
    event.preventDefault();

    if (this.toDoInput.value) {
      Meteor.call('todos.addTodo', this.toDoInput.value)
    }
    
    this.toDoInput.value = '';
    }


  render() {
    const { todos } = this.props;

    return (
      <div className="app-wrapper">
        <div className="login-wrapper">
          <AccountsUIWrapper />
        </div>

        <div className="todo-list">
          <h1>So Much To Do</h1>
          {(!this.props.currentUserId) ?
            <div className="logged-out-message">
              <p>Please sign in to see your todos.</p>
            </div>
            :

            <div>
              <div className="add-todo">
                <form name="addTodo" onSubmit={this.addToDo}>
                  <input type="text" ref={(input) => (this.toDoInput = input)} />
                  <span>(press enter to add)</span>
                </form>
              </div>

              <ul>
                {todos.map((todo, index) => (
                  <ToDoItem
                    key={index}
                    todo={todo}
                    toggleComplete={() => this.toggleComplete(todo)}
                    removeToDo={() => this.removeToDo(todo)}
                  />
                ))}
              </ul>

              <div className="todo-admin">
                <ToDoCount number={todos.length} />
                {this.hasCompleted() && <ClearButton removeCompleted={this.removeCompleted} />}
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}


App.defaultProps = {
  todos: []
}

App.propTypes = {
  currentUser: PropTypes.object,
  currentUserId: PropTypes.string,
  todos: PropTypes.array.isRequired
}

export default createContainer(() => {
  Meteor.subscribe('todos');
  
  return {
    currentUser: Meteor.user(),
    currentUserId: Meteor.userId(),
    todos: ToDos.find({}).fetch()
  };
}, App);
