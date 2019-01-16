const mongoose = require('mongoose');
const {convertToId, convertToArrayOfIds} = require('../helpers/utils');

describe('Testing util functions', () => {
  it('Should convert a string to an Object ID', () => {
    const string = '5c1b7c13f4d84d28c6a86b96';
    const expectedResult = mongoose.Types.ObjectId(string);

    expect(convertToId(string)).toEqual(expectedResult);
  });

  it('Should convert an array of strings to Object IDs', () => {
    const arrayOfStrings = [
      '5c1b7c13f4d84d28c6a86b96',
      '5c2d6cfe5ef590f67ff4a809',
      '5c375de4ad5527407f4e24ea',
      '5c375de4ad5527407f4e24eb'
    ];
    const expectedResult = [];
    for (const string of arrayOfStrings) {
      const id = mongoose.Types.ObjectId(string);
      expectedResult.push(id);
    }

    expect(convertToArrayOfIds(arrayOfStrings)).toEqual(expectedResult);
  });
});