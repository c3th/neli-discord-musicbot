const { Client } = require('discord.js');

const Dispatcher = require('./structures/Dispatcher');
const Registry = require('./structures/Registry');

module.exports = class Neli extends Client {
  constructor(data = {}) {
    super();
    
    this.dev = data.dev;
    this.hideDir = data.hideDir;
    this.locales = data.locales;
    this.commandPrefix = data.commandPrefix;
    
    this.constants = data.constants;
    this.utils = data.utils;
    
    this.registry = new Registry(this);
    this.dispatcher = new Dispatcher(this, this.registry);
  }
}