const { Inhibitor } = require('..');

module.exports = class missingArgs extends Inhibitor {
  constructor(...args) {
    super(...args, {
      name: 'missingArgs'
    });
  }

  async run(msg, { args }) {
    if (!args.length) return msg.locale.MISSING_ARGS;
  }
}