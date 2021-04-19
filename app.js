const express = require('express')
const middleware = require('./middleware/index')
const app = express()
const indexRouter = require('./routes/index')
const regRouter = require('./routes/registration')
const commentRouter = require('./routes/comments')
const cabinetRouter = require('./routes/cabinet')


middleware(app)
app.use(express.static(__dirname + '/public'));

app.use('/', indexRouter);
app.use('/', regRouter);
app.use('/', cabinetRouter);
app.use('/comments', commentRouter);

module.exports = app