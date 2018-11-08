const mongoose = require('mongoose');
const User = mongoose.model('User');
const List = mongoose.model('List');
const utils = require('../helpers/utils');

exports.getUserById = async (req, res) => {
  const user = await User.findOne({_id: req.params._id}).populate('lists');
  res.json(user);
};

exports.getCurrentUser = (req, res) => {
  const user = req.user;
  if (!user) {return res.send('No current user');}
  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.register = async (req, res) => {
  const user = new User({email: req.body.email, name: req.body.name});
  await User.register(user, req.body.password);
  await utils.createListForNewUser(user._id);
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findOne({_id: req.params._id});
  await List.deleteMany({_id: {$in: user.lists}});
  await User.deleteOne({_id: user._id});
  res.send(`The user: ${user.name} is deleted.`);
};