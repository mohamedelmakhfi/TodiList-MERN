const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema ({
    task : String ,
    Description : String ,
    createdAt: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default : false
    }
})

const TaskModel = mongoose.model("tasks", TaskSchema) //Tasks le nom de table de base de donnees TODOLIST
module.exports = TaskModel; 
