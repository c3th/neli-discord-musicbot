const { Music } = require('..');

const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class Playing extends Music {
  constructor(...args) {
    super(...args, {
      name: 'playing',
      desc: locale => locale._PLAYING,
      aliases: ['current', 'np'],
      inhibitors: [
        'playerActive'
      ]
    });
  }

  async run(msg, { music, embed }) {
    const [track] = music.queue.get(msg.guild.id);
    const stream = await music.soundcloud.stream(track.media);

    msg.channel.send(
      new MessageEmbed()
        .setColor(embed.color)
        .setAuthor(track.user.username, track.user.avatar)
        .setDescription(`[${track.title}](${track.url})`)
        .setThumbnail(track.background)
        .addField(msg.locale._REQUESTED_BY, track.requester)
        .addField(msg.locale._DURATION, moment(track.duration).format('mm:ss'), true)
        .addField(msg.locale._REPEATING, track.repeat ? 'Yes' : 'No', true)
        .addField(msg.locale._RAW_URL, `[${track.title}](${stream})`, true)
        .setFooter(embed.footer)
    );
  }
}