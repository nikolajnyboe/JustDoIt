const mongoose = require('mongoose');
const Label = mongoose.model('Label');

exports.create = async (req, res) => {
  const label = new Label({title: req.body.title});
  await label.save();
  res.json(label);
};

exports.delete = async (req, res) => {
  const label = await Label.findOne({_id: req.params._id});
  await label.remove();
  res.send(`The label: ${label.title} is deleted.`);
};