const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  content: String,
  author: {type: Schema.Types.ObjectId, ref:'users'},
  description: String,
});

// commentSchema.statics.mostRecent = async function () {
//   return this.find().sort('createdAt').limit(5).exec();
// }

module.exports = model('comments', commentSchema);