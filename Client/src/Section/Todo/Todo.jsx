import React, { useState } from 'react';
import { BsFillTrashFill, BsPencil } from 'react-icons/bs';
import './Todo.css';
import { format } from 'date-fns';

export default function Todo({
  todo,
  handleCheckboxChange,
  handleDeleteClick,
  handleUpdateClick,
  counter
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(todo.task);
  const [editedDescription, setEditedDescription] = useState(todo.Description);

  const handleEditSave = () => {
    handleUpdateClick(todo._id, editedTask, editedDescription);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="box">
        <div className="content" key={todo._id}>
          <h2>{counter}</h2>
          {isEditing ? (
            <div className='inputModifier'>
              <input
                className='inpuTaskUpdate'
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              <textarea
                className='inpuDescriUpdate'
                type="text"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <br />
              <a onClick={handleEditSave}>Save</a>
              <a onClick={() => setIsEditing(false)}>Cancel</a>

            </div>
          ) : (
            <span className={`${todo.completed ? 'text-line ' : ''}`}>
              <h3>
                {todo.task} {todo.completed && '👍'}
              </h3>
              <h4>{format(new Date(todo.createdAt), 'HH:mm , dd/MM/yyyy')}</h4>
              <p>{todo.Description}</p>
            </span>
          )}
          <div className="elements">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo._id)}
            />
            <BsFillTrashFill
              className="BsFillTrashFill"
              onClick={() => handleDeleteClick(todo._id)}
            />
            {!isEditing && (
              <BsPencil className="Bspencil" onClick={() => setIsEditing(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
