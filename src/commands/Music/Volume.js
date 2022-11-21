const { Music } = require('..');

module.exports = class Volume extends Music {
  constructor(...args) {
    super(...args, {
      name: 'volume',
      desc: locale => locale._VOLUME,
      inhibitors: [
        'devOnly'
      ]
    });
  }

  async run() { }
}