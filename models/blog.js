const {Schema, model} = require('mongoose')

const blogSchema = new Schema({
    title: String,
    body: String,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Blog', blogSchema)