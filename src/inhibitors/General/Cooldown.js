const { Inhibitor } = require('..');

module.exports = class Cooldown extends Inhibitor {
  constructor(...args) {
    super(...args, {
      name: 'cooldown'
    });
  }

  async run(msg, { command }) {
    if (!command.cooldowns.has(msg.author.id)) return false;
    
    const timestamps = command.cooldowns.get(msg.author.id).date;
    const cooldownAmount = command.cooldown * 1000;
    const expires = timestamps + cooldownAmount;
    const now = Date.now();

    if (now < expires) {
      const time = (expires - now) / 1000;

      return msg.locale.TIME_LEFT(time);
    }
  }
}