const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
  title: String,
  content: String,
  author: {type: Schema.Types.ObjectId, ref:'users'},
  comments: [{type: Schema.Types.ObjectId, ref:'comments'}],
  tea: {type: Schema.Types.ObjectId, ref: 'teas'}
}
);

// articleSchema.statics.mostRecent = async function () {
//   return this.find().sort('createdAt').limit(5).exec();
// }

module.exports = model('articles', articleSchema);