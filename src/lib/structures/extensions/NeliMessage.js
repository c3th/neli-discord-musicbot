const { Structures } = require('discord.js');

module.exports = Structures.extend('Message', Message => {
  class NeliMessage extends Message {
    constructor(...args) {
      super(...args);

      this.client.registry
        .registerLanguages(this.client.locales);

      this.languages = this.client.registry.languages;
      this.locale = this.languages.get('en-US');

      this.run();
    }

    async run() {
      const afk = this.client.registry.afk;
      const util = this.client.utils;
      
      const mentions = this.mentions.members;
      const mentionedUser = this.mentions.users.first();

      const afkUser = afk.get(this.author.id);

      if (mentionedUser == this.client.user) {
        return this.channel.send(`Current prefix: \`${this.client.commandPrefix}\``);
      }
      
      if (afk.has(this.author.id) && afkUser.exclusive) {
        const time = util.getAFKTime(afkUser.time);
        await afk.delete(this.author.id);
        
        return this.channel.send(`Welcome back, **${this.author.username}**! You were AFK for: **${time}**`);
      }
      
      if (mentions.size > 0) mentions.forEach(async member => {
        if (afk.has(member.user.id)) {
          const afkUser = afk.get(member.user.id);
          
          if (afkUser.exclusive) {
            const time = util.getAFKTime(afkUser.time);
            return this.channel.send(`**${member.user.username}** is currently AFK: **${afkUser.reason}**, and has been for: **${time}**`);
          }
        }
      });
    }
  }

  return NeliMessage;
});