const { Command } = require('..');

const { MessageEmbed } = require('discord.js');

module.exports = class Help extends Command {
  constructor(...args) {
    super(...args, {
      name: 'help',
      desc: locale => locale._HELP
    });
  }

  async run(msg, { args, embed, util, registry, prefix }) {
    const help = await this.buildHelp(msg);

    if (!args.length) {
      const newEmbed = new MessageEmbed()
        .setColor(embed.color)
        // .setTitle(msg.guild.name, msg.guild.iconURL({ size: 1024, dynamic: true }))
        .setDescription(msg.locale.HELP_DESCRIPTION(prefix))
        .setFooter(`${prefix}help`);

      for (let dir of Object.keys(help)) {
        await newEmbed.addField(dir, [
          '```asciidoc',
          help[dir].join('\n'),
          '```'
        ]);
      }

      return msg.channel.send(newEmbed);
    }

    const command = registry.commands.get(args[0]);

    if (!command) return msg.channel.send(msg.locale.COMMAND_NOT_FOUND);

    switch (args[0]) {
      case command.name: {
        return msg.channel.send(
          new MessageEmbed()
            .setColor(embed.color)
            .setTitle(util.capitilize(command.name))
            .setDescription(command.desc(msg.locale))
            .addField(msg.locale._COOLDOWN, command.cooldown ? `${command.cooldown} secs` : 'No cooldown', true)
            .addField(msg.locale._DEVELOPER_MODE, command.category.includes('Developer'), true)
            .addField(msg.locale._CATEGORY, command.category, true)
          // .addField(msg.locale._PERMISSION, '')
        )
      }
    }
  }

  async buildHelp(msg) {
    const has = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
    const help = {}

    const { commandPrefix, registry, hideDir } = this.client;
    const cmdNames = [...registry.commands.keys()].filter(name => name);
    const longest = cmdNames.reduce((long, str) => Math.max(long, str.length), 0);

    await registry.commands
      .filter(command => !hideDir.includes(command.category))
      .map(command => {
        if (!has(help, command.category)) help[command.category] = [];

        help[command.category].push(`${command.name.padEnd(longest)} :: ${command.desc(msg.locale)}`);
      });

    return help;
  }
}