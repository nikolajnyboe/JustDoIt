const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const listSchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: 'Please fill out name'
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User',
    required: 'Please provide an owner id'
  },
  collaborators: [
    {
      type: Schema.ObjectId,
      ref: 'User'
    }
  ],
  tasks: [
    {
      type: Schema.ObjectId,
      ref: 'Task'
    }
  ]
});

listSchema.plugin(mongodbErrorHandler);

const List = mongoose.model('List', listSchema);

module.exports = List;