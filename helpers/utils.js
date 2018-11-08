const mongoose = require('mongoose');
const User = mongoose.model('User');
const List = mongoose.model('List');

// Users
exports.createListForNewUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    const list = new List({name: 'All Tasks', owner: userId});
    await list.save();
    const updatedUser = await User.findOneAndUpdate(
      {_id: userId}, //query
      {$push: {'lists': list._id}}, //updates
      {new: true, runValidators: true, context: 'query'} //options
    );
    resolve(updatedUser);
  });
};


// Lists
exports.addNewListToOwner = async (ownerId, listId) => {
  return new Promise(async (resolve, reject) => {
    const updatedUser = await User.findOneAndUpdate(
      {_id: ownerId}, //query
      {$push: {'lists': listId}}, //updates
      {new: true, runValidators: true, context: 'query'} //options
    );
    resolve(updatedUser);
  });
};

exports.removeDeletedListFromOwner = async (ownerId, listId) => {
  return new Promise(async (resolve, reject) => {
    const updatedUser = await User.findOneAndUpdate(
      {_id: ownerId},
      {$pull: {'lists': listId}},
      {new: true, runValidators: true, context: 'query'}
    );
    resolve(updatedUser);
  });
};