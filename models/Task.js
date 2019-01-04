const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const taskSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Please fill out title'
  },
  project: {
    type: Schema.ObjectId,
    ref: 'Project',
    required: 'Please provide a project id'
  },
  completed: {
    type: Boolean,
    default: false,
    required: 'Please provide the completed state (true/false)'
  },
  description: {
    type: String,
    default: ''
  },
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

taskSchema.pre('save', async function () {
  await Project.findOneAndUpdate(
    {_id: this.project}, //query
    {$push: {'tasks': this._id}}, //updates
    {new: true, runValidators: true, context: 'query'} //options
  );
});

taskSchema.pre('remove', async function () {
  await Project.findOneAndUpdate(
    {_id: this.project}, //query
    {$pull: {'tasks': this._id}}, //updates
    {new: true, runValidators: true, context: 'query'} //options
  );
});

taskSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Task', taskSchema);

//Task model must be initieted before requireing other models
require('./Project');
const Project = mongoose.model('Project');