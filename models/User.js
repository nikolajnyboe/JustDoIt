const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email'],
    required: 'Please fill out email'
  },
  name: {
    type: String,
    trim: true,
    required: 'Please fill out name'
  },
  projects: [
    {
      type: Schema.ObjectId,
      ref: 'Project',
      required: 'Please provide an array of projects'
    }
  ]
});

userSchema.pre('save', async function () { // this = the user being saved
  if (this.projects.length < 1) {
    const project = new Project({name: 'Tasks', owner: this._id});
    await project.save();
    this.projects.push(project._id);
  }
});

userSchema.pre('remove', async function () { // works but ugly. FIX THIS!
  const projectsToBeDeleted = []
  const projectsToBeChanged = []
  for (const projectId of this.projects) {
    const project = await Project.findOne({_id: projectId});
    if (project.collaborators.length < 1) {
      projectsToBeDeleted.push(project._id);
    } else {
      projectsToBeChanged.push(project);
    }
  };
  if (projectsToBeDeleted.length > 0) {
    await Project.deleteMany({_id: {$in: projectsToBeDeleted}});
  }
  if (projectsToBeChanged.length > 0) {
    for (const project of projectsToBeChanged) {
      const newOwner = project.collaborators[0]
      project.collaborators = project.collaborators.filter(project => !project._id.equals(newOwner._id));
      project.owner = newOwner;
      await Project.updateOne({_id: project._id}, {collaborators: project.collaborators, owner: project.owner});
    };
  }
});

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

module.exports = mongoose.model('User', userSchema);

//User model must be initieted before requireing other models
require('./Project');
const Project = mongoose.model('Project');