const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const {convertStringsToIds} = require('../helpers/utils');

exports.getTasksByProject = async (req, res) => {
  const tasks = await Task.find({project: req.params.projectId}).populate('labels').populate('assignedUser');
  res.json(tasks);
};

exports.getTasksByAssignedUser = async (req, res) => {
  const tasks = await Task.find({assignedUser: req.params.userId});
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Task({title: req.body.title, project: req.params.projectId});
  await task.save();
  res.json(task);
};

exports.update = async (req, res) => {
  const updates = {...req.body};
  if (updates.labels) {
    updates.labels = convertStringsToIds(updates.labels);
  }
  if (updates.project) {
    updates.project = mongoose.Types.ObjectId(updates.project);
  }
  const updatedTask = await Task.findOneAndUpdate(
    {_id: req.params._id},
    updates,
    {new: true, runValidators: true, context: 'query'}
  );
  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOne({_id: req.params._id});
  await task.remove();
  res.json({status: 'deleted', _id: task._id});
};