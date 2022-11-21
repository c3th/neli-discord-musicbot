const { Inhibitor } = require('..');

module.exports = class djOnly extends Inhibitor {
  constructor(...args) {
    super(...args, {
      name: 'djOnly'
    });
  }

  async run() { }
}