const { Music } = require('..');

const { MessageEmbed } = require('discord.js');

module.exports = class Play extends Music {
  constructor(...args) {
    super(...args, {
      name: 'play',
      desc: locale => locale._PLAY,
      usage: '.play',
      aliases: ['p'],
      inhibitors: [
        'missingArgs',
        'memberInVoice'
      ]
    });
  }

  async run(msg, { args, music, embed }) {
    const dataObj = await music.soundcloud.getTrack(args.join(' '), msg.author);

    if (dataObj.code == 404) return msg.channel.send(msg.locale.TRACK_NOT_FOUND(args));
    if (dataObj.kind == 'playlist') return this.playlist(msg, music, dataObj);

    const hasQueue = music.queue.has(msg.guild.id);

    if (hasQueue && music.queue.get(msg.guild.id).length > 0) {
      const queue = music.queue.get(msg.guild.id);

      if (queue.find(track => track.id == dataObj.id)) {
        return msg.channel.send(
          new MessageEmbed()
            .setColor(embed.color)
            .setDescription(msg.locale.TRACK_ALREADY_EXISTS)
        );
      }

      await queue.push(dataObj);

      return msg.channel.send(
        new MessageEmbed()
          .setColor(embed.color)
          .setDescription(msg.locale.QUEUE_NEW_TRACK_ADDED(queue))
          .setFooter(msg.locale.REQUESTED_BY(msg.author.tag))
      );
    }

    if (!hasQueue) await music.queue.set(msg.guild.id, [dataObj]);

    await music.play(music.queue.get(msg.guild.id), msg);
  }

  async playlist(msg, music, playlist) {
    const hasQueue = music.queue.has(msg.guild.id);

    if (hasQueue && queue.get(msg.guild.id).length > 0) {
      const queue = music.queue.get(msg.guild.id);

      for (const track of playlist.tracks) {
        await queue.push(track);
      }
    }

    await msg.channel.send(
      new MessageEmbed()
        .setColor(embed.color)
        .setDescription(msg.locale.QUEUE_PLAYLIST_ADDED(playlist))
    );

    if (!hasQueue) {
      await music.queue.set(msg.guild.id, playlist.tracks);
      await music.play(music.queue.get(msg.guild.id), msg);
    }
  }
}