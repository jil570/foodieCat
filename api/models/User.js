const mongoose = require('mongoose');

const LockoutSchema = new mongoose.Schema({
  attempts: {
    type: Number,
    required: true,
  },
  lastFailedDatetime: {
    type: Number,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lockout: {
    type: LockoutSchema,
    required: true,
  },
  image: {
    type: Buffer,
    required: false,
  },
  address:{
    type: String,
    required: true,
  },
  category1:{
    type: String,
    required: true,
  },
  category2:{
    type: String,
    required: true,
  },
  longitude:{
    type: String,
    required: true,
  },
  latitude:{
    type: String,
    required: true,
  },
  privacy:{
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
