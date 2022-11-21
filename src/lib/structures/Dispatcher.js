require('./extensions/NeliMessage');
require('./extensions/NeliGuild');

const Argument = require('./commands/Argument');

module.exports = class Dispatcher {
  constructor(client, registry) {
    this.client = client;
    this.registry = registry;

    this.arg = new Argument(client, registry);

    this.client.on('message', this.manageMessages.bind(this));
  }

  async manageMessages(msg) {
    const prefix = this.client.commandPrefix;

    if (!msg.content.startsWith(prefix)) return;
    if (msg.author.bot) return;

    const commands = this.registry.commands;
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();
    const command = commands.find(cmd => cmd.aliases.includes(commandName)
      || cmd.name == commandName);

    if (command) {
      this.arg.registerArgument(args, command);

      if (command.inhibitors.length) {
        for (const inhibitors of command.inhibitors) {
          const inhibitor = this.registry.inhibitors.get(inhibitors);
          const response = await inhibitor.run(msg, this.arg);

          if (response) return msg.channel.send(response);
        }
      }

      try {
        command.startCooldown(msg.author.id);
        command.run(msg, this.arg);
      } catch (e) {
        console.error(e);
      }
    }
  }
}