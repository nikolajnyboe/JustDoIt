const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const List = require('./List');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email'],
    require: 'Please fill out email'
  },
  name: {
    type: String,
    trim: true,
    require: 'Please fill out name'
  },
  lists: [
    {
      type: Schema.ObjectId,
      ref: 'List',
      require: 'Please provide an array of lists'
    }
  ]
});

userSchema.plugin(mongodbErrorHandler);
userSchema.plugin(passportLocalMongoose, {usernameField: 'email'});

const User = mongoose.model('User', userSchema);

module.exports = User;