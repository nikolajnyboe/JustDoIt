const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const labelSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please fill out title'
  }
});

labelSchema.pre('remove', async function () {
  await Task.updateMany(
    {labels: this._id}, //query, matches all tasks where this._id is in the array of labels
    {$pull: {'labels': this._id}}, //updates
    {new: true, runValidators: true, context: 'query'} //options
  );
});

labelSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Label', labelSchema);

//Label model must be initieted before requireing other models
require('./Task');
const Task = mongoose.model('Task');