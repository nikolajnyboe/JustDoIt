const mongoose = require('mongoose');
const List = mongoose.model('List');
const utils = require('../helpers/utils');

exports.getListById = async (req, res) => {
  const list = await List.findOne({_id: req.params._id});
  res.json(list);
};

exports.getListsByOwnerId = async (req, res) => {
  const lists = await List.find({owner: req.params._id});
  res.json(lists);
};

exports.createList = async (req, res) => {
  const list = new List({name: req.body.name, owner: req.user._id});
  await list.save();
  await utils.addNewListToOwner(list.owner._id, list._id);
  res.json(list);
};

exports.deleteList = async (req, res) => {
  const list = await List.findOne({_id: req.params._id});
  if (!list.owner._id.equals(req.user._id)) {
    return res.json('Only the owner can delete a list.');
  }
  await utils.removeDeletedListFromOwner(list.owner._id, list._id);
  await List.deleteOne({_id: list._id});
  res.send(`The list: ${list.name} was deleted.`);
};