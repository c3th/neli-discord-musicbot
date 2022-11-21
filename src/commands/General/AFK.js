const { Command } = require('..');

module.exports = class AFK extends Command {
  constructor(...args) {
    super(...args, {
      name: 'afk',
      desc: locale => locale._AFK,
      cooldown: 60
    });
  }

  async run(msg, { args, afk }) {
    const reason = args.length ? args.join(' ') : 'Away From Keyboard';

    if (reason.length > 64) return msg.channel.send('Your reason cannot exceed 64 characters.');

    if (!afk.has(msg.author.id)) {
      await afk.set(msg.author.id, {
        exclusive: true,
        guild: msg.guild.id,
        time: Date.now(),
        reason,
      });

      return msg.channel.send(`Set your AFK status: **${reason}**`);
    }
  }
}