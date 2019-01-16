const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const {convertToId, convertToArrayOfIds} = require('../helpers/utils');

exports.getTasksByProject = async (req, res) => {
  const tasks = await Task.find({project: req.params._id}).populate('labels').populate('assignedUser');
  res.json(tasks);
};

exports.getTasksByAssignedUser = async (req, res) => {
  const tasks = await Task.find({assignedUser: req.params._id}).populate('labels').populate('assignedUser');
  res.json(tasks);
};

exports.getTasksByLabel = async (req, res) => {
  const tasks = await Task.find({labels: req.params._id}).populate('labels').populate('assignedUser');
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Task({title: req.body.title, project: req.body.projectId});
  await task.save();
  res.json(task);
};

exports.update = async (req, res) => {
  const updates = {...req.body};
  if (updates.project) {
    updates.project = mongoose.Types.ObjectId(updates.project);
  }
  if (updates.dueDate) {
    if (updates.dueDate === 'undefined') {
      updates.dueDate = undefined;
    } else {
      updates.dueDate = new Date(updates.dueDate);
    }
  }
  if (updates.assignedUser) {
    if (updates.assignedUser === 'undefined') {
      updates.assignedUser = undefined;
    } else {
      updates.assignedUser = convertToId(updates.assignedUser);
    }
  }
  if (updates.labels) {
    if (updates.labels === 'undefined') {
      updates.labels = [];
    } else {
      updates.labels = convertToArrayOfIds(updates.labels);
    }
  }
  const updatedTask = await Task.findOneAndUpdate(
    {_id: req.params._id},
    updates,
    {new: true, runValidators: true, context: 'query'}
  ).populate('labels').populate('assignedUser');
  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findOne({_id: req.params._id});
  await task.remove();
  res.json({status: 'deleted', _id: task._id});
};