const { Music } = require('..');

module.exports = class Shuffle extends Music {
  constructor(...args) {
    super(...args, {
      name: 'shuffle',
      desc: locale => locale._SHUFFLE,
      cooldown: 60,
      inhibitors: [
        'djOnly',
        'memberInVoice',
        'playerActive'
      ]
    });
  }

  async run(msg, { music, util }) {
    const queue = music.queue.get(msg.guild.id);

    if (queue.length < 5) return msg.channel.send(msg.locale.QUEUE_EXCEED);

    if (queue[0].repeat) {
      queue[0].repeat = false;

      return msg.channel.send(msg.locale.REPEAT_OFF);
    }

    const shuffled = await util.shuffle(queue);

    await music.queue.set(msg.guild.id, shuffled);
    return msg.channel.send(msg.locale.SHUFFLED_TRACKS(shuffled.length));
  }
}