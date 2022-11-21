const { Inhibitor } = require('..');

module.exports = class memberInVoice extends Inhibitor {
  constructor(...args) {
    super(...args, {
      name: 'memberInVoice'
    });
  }

  async run(msg) {
    const member = msg.member.voice.channel;

    if (!member) return msg.locale.JOIN_CHANNEL;
  }
}