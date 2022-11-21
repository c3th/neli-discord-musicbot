const { Command } = require('..');

module.exports = class Post extends Command {
  constructor(...args) {
    super(...args, {
      name: 'post',
      desc: locale => locale._POST,
      cooldown: 60,
      inhibitors: [
        'devOnly'
      ]
    });
  }

  async run(msg, { args }) {
    const { eventManager, listeners, constants: { api } } = this.client;
    const response = await eventManager._call(api.reddit.url(args[0], 'new', 1)).catch(o_O => { });

    if (!response) return msg.channel.send('Reddit was not found.');

    const reddit = eventManager.reddit;

    await listeners.set(msg.guild.id, {
      sub: args[0]
    });

    await reddit._start(msg);

    return msg.channel.send(`Listening for new posts on r/${args[0]}`);
  }
}