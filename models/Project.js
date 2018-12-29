const mongodbErrorHandler = require('mongoose-mongodb-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const projectSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please fill out name'
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

projectSchema.pre('save', async function () { // this = the project being saved
  await User.findOneAndUpdate(
    {_id: this.owner}, //query
    {$push: {'projects': this._id}}, //updates
    {new: true, runValidators: true, context: 'query'} //options
  );
});

projectSchema.pre('remove', async function () { // this = the project being deleted
  await User.findOneAndUpdate(
    {_id: this.owner}, //query
    {$pull: {'projects': this._id}}, //updates
    {new: true, runValidators: true, context: 'query'} //options
  );
  await Task.deleteMany({project: this._id});
});

projectSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('Project', projectSchema);

//Project model must be initieted before requireing other models
require('./User');
const User = mongoose.model('User');
require('./Task');
const Task = mongoose.model('Task');

