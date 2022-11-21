const { Structures } = require('discord.js');

module.exports = Structures.extend('Guild', Guild => {
  class NeliGuild extends Guild {
    constructor(...args) {
      super(...args);

      this.language = null;
      this.prefix = null;
    }
  }

  return NeliGuild;
});