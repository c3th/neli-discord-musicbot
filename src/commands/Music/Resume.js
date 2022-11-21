const { Music } = require('..');

module.exports = class Resume extends Music {
  constructor(...args) {
    super(...args, {
      name: 'resume',
      desc: locale => locale._RESUME,
      aliases: ['unfreeze'],
      inhibitors: [
        'djOnly',
        'memberInVoice',
        'playerActive'
      ]
    });
  }

  async run(msg, { music }) {
    const player = music.player.get(msg.guild.id);

    if (player.dispatcher.paused) {
      player.dispatcher.resume();

      return msg.react('▶️');
    }

    return msg.channel.send(msg.locale.TRACK_NOT_PAUSED);
  }
}