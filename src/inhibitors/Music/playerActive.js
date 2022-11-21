const { Inhibitor } = require('..');

module.exports = class playerActive extends Inhibitor {
  constructor(...args) {
    super(...args, {
      name: 'playerActive'
    });
  }

  async run(msg, { music }) {
    const player = music.player.get(msg.guild.id);

    if (!player) return msg.locale.PLAY_MUSIC;
  }
}