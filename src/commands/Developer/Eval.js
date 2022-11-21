const { Command } = require('..');

module.exports = class Eval extends Command {
  constructor(...args) {
    super(...args, {
      name: 'eval',
      desc: locale => locale._EVAL,
      inhibitors: [
        'devOnly',
        'missingArgs'
      ]
    });
  }

  clean(str) {
    if (typeof (str) == 'string')
      return str.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    else
      return str;
  }

  async run(msg, { args }) {
    try {
      const evaled = eval(args.join(' '));

      msg.channel.send(this.clean(evaled), { code: 'xl' });
    } catch (err) {
      msg.channel.send(this.clean(err), { code: 'xl' });
    }
  }
}