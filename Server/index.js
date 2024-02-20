const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TaskModel = require("./models/Tasks");

mongoose
  .connect(
    "mongodb+srv://mohamedelmakhfi6:txcsAgAnpAENJeNN@cluster0.g5bfrva.mongodb.net/TODOLIST?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected successfully");
  })
  .catch((error) => {
    console.log("Error connecting to the database", error);
  });

const app = express();
app.use(cors());
app.use(express.json());

// Add Task
app.post('/AddTask', async (req, res) => {
  try {
      if (!req.body.task || !req.body.Description) {
          return res.status(400).json({ error: "Task and Description are required fields" });
      }
      const newTask = await TaskModel.create({
          task: req.body.task,
          Description: req.body.Description,
          completed: false, 
          createdAt: new Date() 
      });

      res.json(newTask);
  } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


// Get all tasks
app.get("/getTodos", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error getTodos task" });
    }
})


//update value checkbox
app.put('/toggleTodo/:id', async (req, res) => {
  try {
      const id = req.params.id;
      const existingTodo = await TaskModel.findById(id);
      existingTodo.completed = !existingTodo.completed;
      await existingTodo.save();
      res.status(200).json({ success: true });
  } catch (error) {
      console.error("Error toggling todo:", error);
      res.status(500).json({ error: "Error toggleTodo task" });
  }
});


//Updating task and description
app.put('/UpdatingTask/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { taskUpdate, descriptionUpdate } = req.body; 
    const updatingTask = await TaskModel.findByIdAndUpdate(
      { _id: id },
      { task: taskUpdate, Description: descriptionUpdate , createdAt: new Date() },
    );

    if (!updatingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatingTask);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//delete task
app.delete("/deleteTodo/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const deletedTodo = await TaskModel.findByIdAndDelete({_id: id});
  
      if (deletedTodo) {
        res.status(200).json({ message: 'task deleted successfully', deletedTodo });
    } else {
        res.status(404).json({ message: 'tas not found' });
    }    
    } catch (error) {
        res.status(500).json({ error: "Error deleting task" });
    }
  });


app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
  });
  