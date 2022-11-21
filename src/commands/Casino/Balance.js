const { Command } = require('..');

module.exports = class Balance extends Command {
  constructor(...args) {
    super(...args, {
      name: 'balance',
      desc: 'Checks your current balance.',
      aliases: ['bal'],
      inhibitors: []
    });
  }

  async run(msg, { args }) {
    switch (args[0]) {
      case 'reset': {}
      case 'add': {}
      case 'set': {}
    }
  }
}