const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const labelSchema = new Schema({
  name: String
});

labelSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Label', labelSchema);