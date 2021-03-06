const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const {convertToId, convertToArrayOfIds} = require('../helpers/utils');

exports.getProjectById = async (req, res) => {
  const project = await Project.findOne({_id: req.params._id}).populate([
    {
      path: 'tasks',
      populate: [
        {path: 'labels'},
        {path: 'assignedUser'}
      ]
    },
    {path: 'collaborators'},
    {path: 'owner'}
  ]);
  res.json(project);
};

exports.getProjectsByUserId = async (req, res) => {
  const projects = await Project.find({owner: req.params._id}).populate([
    {
      path: 'tasks',
      populate: [
        {path: 'labels'},
        {path: 'assignedUser'}
      ]
    },
    {path: 'collaborators'},
    {path: 'owner'}
  ]);
  const sharedProjects = await Project.find({collaborators: req.params._id}).populate([
    {
      path: 'tasks',
      populate: [
        {path: 'labels'},
        {path: 'assignedUser'}
      ]
    },
    {path: 'collaborators'},
    {path: 'owner'}
  ]);
  res.json([...projects, ...sharedProjects]);
};

exports.createProject = async (req, res) => {
  let project = new Project({name: req.body.name, owner: req.user._id});
  await project.save();
  project = await Project.populate(project, {path: 'owner'});
  res.json(project);
};

exports.updateProject = async (req, res) => {
  const updates = {...req.body};
  const project = await Project.findOne({_id: req.params._id});
  if (!project.owner._id.equals(req.user._id)) {
    throw new Error('Only the owner can edit a project');
  }
  if (updates.owner) {
    updates.owner = convertToId(updates.owner);
  }
  if (updates.collaborators) {
    if (updates.collaborators === 'undefined') {
      updates.collaborators = [];
    } else {
      updates.collaborators = convertToArrayOfIds(updates.collaborators);
    }
  }
  const updatedProject = await Project.findOneAndUpdate(
    {_id: project._id}, //query
    updates, //updates
    {new: true, runValidators: true, context: 'query'} //options
  ).populate([
    {
      path: 'tasks',
      populate: [
        {path: 'labels'},
        {path: 'assignedUser'}
      ]
    },
    {path: 'collaborators'},
    {path: 'owner'}
  ]);
  res.json(updatedProject);
};

exports.deleteProject = async (req, res) => {
  const project = await Project.findOne({_id: req.params._id});
  if (!project.owner._id.equals(req.user._id)) {
    return res.json('Only the owner can delete a project.');
  }
  await project.remove();
  res.json({status: 'deleted', _id: project._id});
};