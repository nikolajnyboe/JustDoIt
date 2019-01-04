const mongoose = require('mongoose');

exports.convertStringsToIds = (arrayOfStrings) => {
  if (!Array.isArray(arrayOfStrings)) {
    arrayOfStrings = JSON.parse(arrayOfStrings);
  } else {
    if (arrayOfStrings[0]._id) {
      const arrayOfIdStrings = []
      for (const label of arrayOfStrings) {
        arrayOfIdStrings.push(label._id);
      }
      arrayOfStrings = arrayOfIdStrings;
    }
  }
  const convertedIds = [];
  for (const string of arrayOfStrings) {
    const convertedId = mongoose.Types.ObjectId(string);
    convertedIds.push(convertedId);
  }
  return convertedIds;
};