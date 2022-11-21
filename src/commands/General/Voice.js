const { Command } = require('..');

module.exports = class VoiceChat extends Command {
  constructor(...args) {
    super(...args, {
      name: 'voice',
      desc: locale => locale._VOICE,
      aliases: ['vc']
    });
  }

  async run(msg, { args }) {
    const category = msg.guild.channels.cache.get('774781480572289056');

    console.log(category);
  }
}