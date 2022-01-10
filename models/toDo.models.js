
const mongoose = require('mongoose')

const schema = mongoose.Schema

const toDoSchema = new schema({
    title : {type : String},
    content : {type : String},
    status : {type : String, enum : ['In progress', 'Review', 'Done']},
    userId : {type : schema.Types.ObjectId, ref : 'user'}
}, {timestamps : true})

const toDoModel = mongoose.model('todo', toDoSchema)

module.exports = {
    toDoModel
}