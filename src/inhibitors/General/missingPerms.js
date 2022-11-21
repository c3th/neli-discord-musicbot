const { Inhibitor } = require('..');

module.exports = class missingPerms extends Inhibitor {
  constructor(...args) {
    super(...args, {
      name: 'missingPerms'
    });
  }

  async run() { }
}