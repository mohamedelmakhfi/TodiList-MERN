import React, { useEffect, useState } from "react";
import Create from "../Section/Create_section/Create";
import axios from "axios";
import TodoList from "../Section/Todolist/TodoList";
import './Home.css';

export default function Home() {
  const [Todos, setTodos] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/getTodos")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, [Todos]);

  const handleCheckboxChange = async (id) => {
    try {
      await axios
        .put(`http://localhost:3001/toggleTodo/${id}`)
        .then((res) => console.log("paarfaiiit " , res));
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios
        .delete(`http://localhost:3001/deleteTodo/${id}`)
        .then((res) => console.log(res));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdateClick = async (id, taskUpdate, descriptionUpdate) => {
    try {
      await axios.put(`http://localhost:3001/UpdatingTask/${id}`, { taskUpdate, descriptionUpdate });
      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  

  return (
    
      <div className="title">
        <h1>Todo List</h1>
        <div>
          <Create />
          <TodoList
            todos={Todos}
            handleCheckboxChange={handleCheckboxChange}
            handleDeleteClick={handleDeleteClick}
            handleUpdateClick={handleUpdateClick}
          />
      </div>
      </div>
      
      
    
  );
  }

