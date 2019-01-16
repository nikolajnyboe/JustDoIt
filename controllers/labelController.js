const mongoose = require('mongoose');
const Label = mongoose.model('Label');

exports.getLabels = async (req, res) => {
  const labels = await Label.find();
  res.json(labels);
};

exports.create = async (req, res) => {
  const label = new Label({title: req.body.title});
  await label.save();
  res.json(label);
};

exports.edit = async (req, res) => {
  const updates = {...req.body};
  const updatedLabel = await Label.findOneAndUpdate(
    {_id: req.params._id}, //query
    updates, //updates
    {new: true, runValidators: true, context: 'query'} //options
  );
  res.json(updatedLabel);
};

exports.delete = async (req, res) => {
  const label = await Label.findOne({_id: req.params._id});
  await label.remove();
  res.json({status: 'deleted', _id: label._id});
};