const userRoutes = require('express').Router()
const {addUser, signin} = require('../controller/user.controller')


userRoutes.post('/', addUser)
userRoutes.post('/signin', signin)



module.exports = {
    userRoutes
}