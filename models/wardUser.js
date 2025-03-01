const mongoose = require('mongoose');

const wardenSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const WardUser = mongoose.models.WardUser || mongoose.model('WardUser', wardenSchema);

module.exports = WardUser;
