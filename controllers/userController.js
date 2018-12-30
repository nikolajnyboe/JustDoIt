const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUserById = async (req, res) => {
  const user = await User.findOne({_id: req.params._id}).populate({
    path: 'projects',
    populate: {
      path: 'collaborators',
      path: 'tasks',
      populate: {path: 'labels'}
    }
  });
  res.json(user);
};

exports.getCurrentUser = async (req, res) => {
  let user = req.user;
  if (!user._id) {return res.json({});}
  user = await User.findOne({_id: user._id}).populate({
    path: 'projects',
    populate: {
      path: 'collaborators',
      path: 'tasks',
      populate: {path: 'labels'}
    }
  });
  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.register = async (req, res) => {
  const user = new User({email: req.body.email, name: req.body.name});
  await User.register(user, req.body.password);
  res.json(user);
};

exports.update = async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    {_id: req.params._id}, //query
    {...req.body}, //updates
    {new: true, runValidators: true, context: 'query'} //options
  );
  res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
  const user = await User.findOne({_id: req.params._id});
  await user.remove();
  res.send(`The user: ${user.name} is deleted.`);
};