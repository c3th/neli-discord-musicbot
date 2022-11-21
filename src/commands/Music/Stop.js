const { Music } = require('..');

module.exports = class Stop extends Music {
  constructor(...args) {
    super(...args, {
      name: 'stop',
      desc: locale => locale._STOP,
      aliases: ['disconnect', 'leave'],
      inhibitors: [
        'djOnly',
        'memberInVoice'
      ]
    });
  }

  async run(msg, { music }) {
    await msg.react('👍');

    return music.stop(msg);
  }
}