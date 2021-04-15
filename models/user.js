const { Schema, model } = require('mongoose');

const userScheme = new Schema({
  username: String,
  email: String,
  password: String,
  role: {type: String, default: 'Пользователь'},
  comments: [{type: Schema.Types.ObjectId, ref: 'comments'}]
}
);

// userScheme.statics.mostRecent = async function () {
//   return this.find().sort('createdAt').limit(5).exec();
// }

module.exports = model('users', userScheme);