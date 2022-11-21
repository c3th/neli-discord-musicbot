const Event = require('../lib/structures/Event');

module.exports = class newMeme extends Event {
  constructor(...args) {
    super(...args, {
      name: 'newMeme'
    });
  }

  async run(data, msg) { }
}