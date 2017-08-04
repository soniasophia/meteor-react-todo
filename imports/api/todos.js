import { Mongo } from 'meteor/mongo';

export const ToDos = new Mongo.Collection('todos');

// Create a todos publication that the client can subscribe to
if (Meteor.isServer) {
  Meteor.publish('todos', function todosPublication() {
    return ToDos.find({ owner: this.userId });
  });
}

// Allow client to do these things only to this collection...
Meteor.methods({

  // Toggling todo item as complete/not complete
  'todos.toggleComplete'(todo) {
    if (todo.owner !== this.userId) {
      throw new Meteor.Error('todos.toggleComplete.not-authorized',
        'You are not allowed to update to-dos for other users.')
    }

    ToDos.update(todo._id, {
      $set: { complete: !todo.complete }
    });
  },

  // Remove a todo item
  'todos.removeTodo'(todo) {
    if (todo.owner !== this.userId) {
      throw new Meteor.Error('todos.removeTodo.not-authorized',
        'You are not allowed to remove to-dos from other users.')
    }

    ToDos.remove(todo._id);
  },

  // Remove completed todos
  'todos.removeCompleted'() {
    if (!this.userId) {
      throw new Meteor.Error('todos.removeCompleted.not-authorized',
        'You are not allowed to remove to-dos from other users.')
    }

    ToDos.remove({complete: true, owner: this.userId});
  },

  // Check if any of the todos are completed
  'todos.hasCompleted'() {
    const completed = this.props.todos.filter((todo) => todo.complete);
    return completed.length > 0 ? true : false;
  },

  // Add a todo item
  'todos.addTodo'(data) {
    if (!this.userId) {
      throw new Meteor.Error('todos.addTodo.not-authorized',
        'Please sign in to add a todo!')
    }

    ToDos.insert({
      title: data,
      complete: false,
      owner: this.userId
    })
  }
});