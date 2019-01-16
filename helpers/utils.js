const mongoose = require('mongoose');

const convertToId = string => {
  string = string._id ? string._id : string;
  return mongoose.Types.ObjectId(string);
};

exports.convertToId = convertToId;

exports.convertToArrayOfIds = arrayOfStrings => {
  if (!Array.isArray(arrayOfStrings)) arrayOfStrings = JSON.parse(arrayOfStrings);
  const arrayOfIds = [];
  for (let string of arrayOfStrings) {
    const id = convertToId(string);
    arrayOfIds.push(id);
  }
  return arrayOfIds;
};