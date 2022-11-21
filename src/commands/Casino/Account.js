const { Command } = require('..');

const { MessageEmbed } = require('discord.js');

module.exports = class Account extends Command {
  constructor(...args) {
    super(...args, {
      name: 'account',
      desc: 'Checks your account.',
      aliases: ['acc'],
      inhibitors: []
    });
  }

  async run(msg, { args, casino, embed }) {
    const user = await casino.getUser(msg.author.id);

    return msg.channel.send(
      new MessageEmbed()
        .setColor(embed.color)
        .setFooter(embed.footer)
        .setTitle(`${msg.author.username}'s Account`)
        .setDescription(`Balance: **$${user.balance.toFixed(1)}**`)
        .addField('Account Activity', user.accountActivity.length ? user.accountActivity.join('\n') : 'No activity', true)
    );
  }
}