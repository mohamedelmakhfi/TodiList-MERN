import React from 'react';
import Todo from '../Todo/Todo';
import './TodoList.css';


export default function TodoList({ todos, handleCheckboxChange, handleDeleteClick ,handleUpdateClick}) {
  return (
    <div className="container">
      {todos.length === 0 ? (
        <h3>No record</h3>
      ) : (
        todos.map((todo, index) => (
          <Todo
            key={todo._id}
            todo={todo}
            handleCheckboxChange={handleCheckboxChange}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
            counter={index + 1}
          />
        ))
    
      )}
    </div>
  );
}
