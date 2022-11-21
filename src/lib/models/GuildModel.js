const { Schema, model } = require('mongoose');

const GuildModel = Schema({
  id: { type: String, defualt: null },
  prefix: { type: String, defualt: null },
  voiceParent: { type: String, defualt: null },
  language: { type: String, defualt: 'en-US' },
  
});

module.exports = model('Guild', GuildModel);