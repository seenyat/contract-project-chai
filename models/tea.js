const { Schema, model } = require('mongoose');

const teaSchema = new Schema({
  name: String,
  price: String,
  description: String,
  location: String,
  locationCoords: String
});

// teaSchema.statics.mostRecent = async function () {
//   return this.find().sort('createdAt').limit(5).exec();
// }

module.exports = model('teas', teaSchema);