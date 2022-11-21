const { Music } = require('..');

module.exports = class Skip extends Music {
  constructor(...args) {
    super(...args, {
      name: 'skip',
      desc: locale => locale._SKIP,
      aliases: ['s'],
      cooldown: 5,
      inhibitors: [
        'djOnly',
        'memberInVoice',
        'playerActive'
      ]
    });
  }

  async run(msg, { args, music }) {
    const queue = music.queue.get(msg.guild.id);

    if (!args.length || isNaN(args)) args = 1;

    if (queue[0].repeat) {
      queue[0].repeat = false;

      msg.channel.send(msg.locale.REPEAT_OFF);
    }

    await queue.splice(0, args);
    await music.queue.set(msg.guild.id, queue);
    await msg.channel.send(msg.locale.SKIPPED_SONGS(args));

    return music.play(queue, msg);
  }
}