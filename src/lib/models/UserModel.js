const { Schema, model } = require('mongoose');

const UserModel = Schema({
  id: { type: String, default: null },
  dm: { type: Boolean, default: true },
  isDonator: { type: Boolean, default: false },
  isUpvoter: { type: Boolean, default: false },
  isHidden: { type: Boolean, default: false },
  accountActivity: { type: Array, default: [] },
  balance: { type: Number, default: 0 },
});

module.exports = model('User', UserModel);