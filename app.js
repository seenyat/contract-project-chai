const express = require('express')
const middleware = require('./middleware/index')
const indexRouter = require('./routes/index')
const app = express()

middleware(app)
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);

module.exports = app