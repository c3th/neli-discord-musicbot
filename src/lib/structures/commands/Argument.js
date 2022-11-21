const MusicManager = require('../managers/MusicManager');
const CasinoManager = require('../managers/CasinoManager');

module.exports = class Argument {
  constructor(client, registry) {
    this.client = client;
    this.registry = registry;
    
    this.afk = client.registry.afk;
    this.prefix = client.commandPrefix;
    this.constants = client.constants;
    this.embed = client.constants.embed;
    this.util = client.utils;
    this.dev = client.dev;

    this.args = null;
    this.command = null;

    this.casino = new CasinoManager(client);
    this.music = new MusicManager(client);
  }

  registerArgument(args, command) {
    this.args = args;
    this.command = command;
    
    return this;
  }
}