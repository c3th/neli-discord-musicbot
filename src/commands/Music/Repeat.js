const { Music } = require('..');

const { MessageEmbed } = require('discord.js');

module.exports = class Repeat extends Music {
  constructor(...args) {
    super(...args, {
      name: 'repeat',
      desc: locale => locale._REPEAT,
      aliases: ['loop'],
      inhibitors: [
        'djOnly',
        'memberInVoice',
        'playerActive',
      ]
    });
  }

  async run(msg, { music }) {
    let [track] = music.queue.get(msg.guild.id);

    if (!track.repeat) {
      track.repeat = true;

      return msg.channel.send(
        new MessageEmbed()
          .setDescription(msg.locale.REPEATING_TRACK_TITLE(track.title))
          .setFooter(msg.locale.REQUESTED_BY(msg.author))
      );
    } else {
      track.repeat = false;

      return msg.channel.send(
        new MessageEmbed()
          .setDescription(msg.locale.NOT_REPEATING_TRACK)
          .setFooter(msg.locale.REQUESTED_BY(msg.author))
      );
    }
  }
}