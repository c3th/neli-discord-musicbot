const { Command } = require('..');

module.exports = class Status extends Command {
  constructor(...args) {
    super(...args, {
      name: 'status',
      desc: locale => locale._STATUS,
      inhibitors: [
        'devOnly',
        'missingArgs'
      ]
    });
  }

  async run() { }
}