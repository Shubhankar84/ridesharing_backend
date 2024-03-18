const ToDoModel = require('../model/to_do_model');

class ToDoservices{
    static async createtoDo(userId, title, desc){
        const createTodo = new ToDoModel({userId, title, desc});
        return await createTodo.save();
    }

    static async getTododata(userId){
        const todoData = await ToDoModel.find({userId});
        return todoData;
    }
}

module.exports = ToDoservices;