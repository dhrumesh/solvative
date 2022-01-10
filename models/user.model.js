const { bool, boolean } = require('@hapi/joi')
const mongoose = require('mongoose')

const schema = mongoose.Schema

const userSchema = new schema({
    name : {type : String},
    email : {type : String,},
    password : {type : String},
    isAdmin : {type : Boolean, default : false}
})

const userModel = mongoose.model('user', userSchema)

module.exports = {
    userModel
}