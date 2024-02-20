import React, { useState } from 'react';
import axios from 'axios';
import './Create.css';

export default function Create() {
  const [task, setTask] = useState('');
  const [Description, setDescription] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleAdd = () => {

    // Check if the input is empty
    if (!task.trim()  || !Description.trim()) {
      setErrorMessage("Please fill out all fields");
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
      return; 
    }

    axios.post('http://localhost:3001/AddTask', { task , Description})
      .then((result) => {
        console.log(result);
        setSuccessMessage('Task added successfully!');
        setTask(''); 
        setDescription('')
        setTimeout(() => {
          setSuccessMessage(''); 
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className='create_form'>
        <input
          type="text"
          placeholder='Enter Task'
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="text"
          placeholder='Description of the Task'
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="button" onClick={handleAdd}>Create Task</button>
        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

      </div>
    </div>
  );
}
