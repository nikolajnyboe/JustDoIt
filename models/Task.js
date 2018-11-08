const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const taskSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: 'Please fill out name'
  },
  description: String,
  dueDate: Date,
  assignedUser: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  labels: [
    {
      type: Schema.ObjectId,
      ref: 'Label'
    }
  ]
});

taskSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Task', taskSchema);