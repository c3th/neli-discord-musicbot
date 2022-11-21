const { Collection } = require('discord.js');

module.exports = class Command {
  constructor(client, data = {}) {
    this.client = client;

    this.perms = data.perms;
    this.category = data.category;
    this.name = data.name || null;
    this.desc = data.desc || null;
    this.aliases = data.aliases || [];
    this.inhibitors = data.inhibitors || [];
    this.dev = data.dev || false;
    this.usage = data.usage || null;
    this.cooldown = data.cooldown || null;

    this.cooldowns = new Collection();
  }

  startCooldown(user) {
    const now = Date.now();

    if (!this.cooldown) return;

    this.cooldowns.set(user, {
      date: now,
      timeout: setTimeout(() => {
        this.cooldowns.delete(user);
      }, this.cooldown * 1000)
    });
  }
}