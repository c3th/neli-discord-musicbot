const Event = require('../lib/structures/Event');

module.exports = class voiceStateUpdate extends Event {
  constructor(...args) {
    super(...args, {
      name: 'voiceStateUpdate'
    });
  }

  async run(oldState, newState) { }
}