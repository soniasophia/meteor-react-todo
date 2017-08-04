import React from 'react';
import PropTypes from 'prop-types';

const ToDoItem = ({ todo, toggleComplete, removeToDo }) => (
  <li>{todo.title}
      <input
         type="checkbox"
         id={todo._id}
         checked={todo.complete} 
         onChange={toggleComplete}/>
      <label htmlFor={todo._id}></label>
      <button onClick={removeToDo}>
         <i className="fa fa-trash"></i>
      </button>
   </li>
);

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    complete: PropTypes.bool
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  removeToDo: PropTypes.func.isRequired
}

export default ToDoItem;