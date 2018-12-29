const mongoose = require('mongoose');

exports.convertStringsToIds = (arrayOfStrings) => {
  if (!Array.isArray(arrayOfStrings)) {
    arrayOfStrings = JSON.parse(arrayOfStrings);
  }
  const convertedIds = [];
  for (const string of arrayOfStrings) {
    const convertedId = mongoose.Types.ObjectId(string);
    convertedIds.push(convertedId);
  }
  return convertedIds;
};