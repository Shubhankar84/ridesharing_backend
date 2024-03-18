const ToDoservices = require("../services/todoServices");

exports.createToDo = async (req, res, next)  => {
    try {
        const {userId, title, desc} = req.body;
        let toDo = await ToDoservices.createtoDo(userId, title, desc);

        res.json({status:true, success:toDo});
    } catch (error) {
        next(error);
    }
}

exports.getUserTodo = async (req, res, next)  => {
    try {
        const {userId} = req.body;
        let toDo = await ToDoservices.getTododata(userId);

        res.json({status:true, success:toDo});
    } catch (error) {
        next(error);
    }
}