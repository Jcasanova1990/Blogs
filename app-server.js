const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')


app.use(express.json()) // req.body
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
app.use(logger('dev'))
app.use(favicon(path.join(__dirname, 'public', 'img','logo.png')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/blogs', require('./routes/api/blogs'))
app.use('/api/users', require('./routes/api/users')) // I am listening for any route that starts with /api/users
// http://localhost:8000/api/todos/completed
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app
