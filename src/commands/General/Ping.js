const { Command } = require('..');

module.exports = class Ping extends Command {
  constructor(...args) {
    super(...args, {
      name: 'ping',
      desc: locale => locale._PING
    });
  }

  async run(msg) {
    return msg.channel.send(msg.locale.PONG_RESPONSE);
  }
}