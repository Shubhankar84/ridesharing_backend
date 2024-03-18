const router = require('express').Router();
const ToDoController = require('../controller/todoController');

router.post('/storeTodo', ToDoController.createToDo);
router.post('/getUserTodoList', ToDoController.getUserTodo);

module.exports = router;