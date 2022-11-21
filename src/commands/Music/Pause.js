const { Music } = require('..');

module.exports = class Pause extends Music {
  constructor(...args) {
    super(...args, {
      name: 'pause',
      desc: locale => locale._PAUSE,
      aliases: ['freeze'],
      inhibitors: [
        'djOnly',
        'memberInVoice',
        'playerActive'
      ]
    });
  }

  async run(msg, { music }) {
    const player = music.player.get(msg.guild.id);

    if (!player.dispatcher.paused) {
      player.dispatcher.pause();

      return msg.react('⏸️');
    }

    return msg.channel.send(msg.locale.TRACK_ALREADY_PAUSED);
  }
}