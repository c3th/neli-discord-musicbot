const { Collection } = require('discord.js');

const mongoose = require('mongoose');
const fse = require('fs-extra');

module.exports = class Registry {
  constructor(client) {
    this.client = client;

    this.inhibitorPath = null;
    this.languagePath = null;
    this.commandPath = null;
    this.eventPath = null;

    this.afk = new Collection();
    this.inhibitors = new Collection();
    this.languages = new Collection();
    this.commands = new Collection();
    this.events = new Collection();
  }

  registerMongoDatabase({ user, name, uri, password }) {
    mongoose.connect(`mongodb+srv://${user}:${password}@${uri}/${name}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    return this;
  }

  registerDefaultPath(path) {
    fse.readdirSync(path)
      .filter(dir => fse.statSync(path + `/${dir}`).isDirectory())
      .forEach(dir => {
        switch (dir) {
          case 'commands': this.commandPath = path + `/${dir}`; break;
          case 'inhibitors': this.inhibitorPath = path + `/${dir}`; break;
          case 'languages': this.languagePath = path + `/${dir}`; break;
          case 'events': this.eventPath = path + `/${dir}`; break;
        }
      });

    return this.registerEvents();
  }

  registerEvents() {
    const events = fse.readdirSync(this.eventPath);

    events.forEach(file => {
      const pull = require(this.eventPath + `/${file}`);
      const event = new pull(this.client);

      this.events.set(event.name, event);
      this.client.on(event.name, (...args) => event.run(...args));
    });

    console.debug(`Registered ${events.length} ${events.length > 1 ? 'events' : 'event'}`);

    return this;
  }

  registerInhibitors(array = []) {
    array.forEach(([groupPath, groupName]) => {
      const inhibitors = fse.readdirSync(this.inhibitorPath + `/${groupPath}`);

      inhibitors.forEach(file => {
        const pull = require(this.inhibitorPath + `/${groupPath}/${file}`);
        const inhibitor = new pull(this.client);

        inhibitor.category = groupName;
        this.inhibitors.set(inhibitor.name, inhibitor);
      });

      console.debug(`Registered ${inhibitors.length} ${inhibitors.length > 1 ? 'inhibitors' : 'inhibitor'} in ${groupPath}`);
    });

    return this;
  }

  registerLanguages(array = []) {
    fse.readdirSync(this.languagePath).forEach(file => {
      const pull = require(this.languagePath + `/${file}`);
      const language = new pull(this.client);

      array.filter(lang => language.name == lang).forEach(() => {
        this.languages.set(language.name, language);
      });
    });

    return this;
  }

  registerCommandGroups(array = []) {
    array.forEach(([groupPath, groupName]) => {
      const commands = fse.readdirSync(this.commandPath + `/${groupPath}`);

      commands.forEach(file => {
        const pull = require(this.commandPath + `/${groupPath}/${file}`);
        const command = new pull(this.client);

        command.category = groupName;
        this.commands.set(command.name, command);
      });

      console.debug(`Registered ${commands.length} ${commands.length > 1 ? 'commands' : 'command'} in ${groupPath}`);
    });

    return this;
  }
}