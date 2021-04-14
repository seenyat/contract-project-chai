const express = require('express')
const middleware = require('./middleware/index')
const indexRouter = require('./routes/index')
const app = express()
const regRouter = require('./routes/registration')

middleware(app)
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/', regRouter);

module.exports = app