const { Inhibitor } = require('..');

module.exports = class devOnly extends Inhibitor {
  constructor(...args) {
    super(...args, {
      name: 'devOnly'
    });
  }

  async run(msg, { dev }) {
    if (!dev.includes(msg.author.id)) {
      return msg.locale.DEV_ONLY;
    }
  }
}