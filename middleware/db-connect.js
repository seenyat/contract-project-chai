const mongoose = require("mongoose")

  mongoose.connect('mongodb://127.0.0.1:27017/TeaStory', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}, () => {
  console.log('connected to db')
})
module.exports = mongoose.connection