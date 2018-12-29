const mongoose = require('mongoose');
const Project = mongoose.model('Project');

exports.getProjectById = async (req, res) => {
  const project = await Project.findOne({_id: req.params._id}).populate('tasks');
  res.json(project);
};

exports.getProjectsByOwnerId = async (req, res) => {
  const projects = await Project.find({owner: req.params._id});
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const project = new Project({name: req.body.name, owner: req.user._id});
  await project.save();
  res.json(project);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findOne({_id: req.params._id});
  if (!project.owner._id.equals(req.user._id)) {
    return res.json('Only the owner can update a project.');
  }
  const updatedProject = await Project.findOneAndUpdate(
    {_id: project._id}, //query
    {name: req.body.name}, //updates
    {new: true, runValidators: true, context: 'query'} //options
  );
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