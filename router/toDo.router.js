const toDoRoutes = require('express').Router()
const { addTodo, updateTodo, deleteTodo, allList, getTodo} = require('../controller/toDo.controller')
const {verify} = require('../middlewares/verify')

toDoRoutes.post('/',verify,  addTodo)
toDoRoutes.patch('/',verify,  updateTodo)
toDoRoutes.delete('/',verify,  deleteTodo)
toDoRoutes.get('/all/:status',verify,  allList)
toDoRoutes.get('/',verify,  getTodo)





module.exports = {
    toDoRoutes
}