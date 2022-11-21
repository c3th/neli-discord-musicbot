const { Collection, MessageEmbed } = require('discord.js');

const SoundCloud = require('../services/SoundCloud');

module.exports = class MusicManager {
  constructor(client) {
    this.timeout = null;

    this.queue = new Collection();
    this.player = new Collection();
    this.playlist = new Collection();

    this.soundcloud = new SoundCloud(client);
  }

  async stop(msg) {
    const player = this.player.get(msg.guild.id);

    if (player) player.connection.disconnect();

    await this.player.delete(msg.guild.id);
    await this.queue.delete(msg.guild.id);
  }

  async disconnect(msg) {
    const player = this.player.get(msg.guild.id);

    await player.dispatcher.pause();

    this.timeout = setTimeout(async () => {
      this.stop(msg);
    }, 60 * 1000);

    await this.player.delete(msg.guild.id);
    await this.queue.delete(msg.guild.id);
  }

  async play([song], msg) {
    const queue = this.queue.get(msg.guild.id);

    if (this.timeout) {
      await clearTimeout(this.timeout);

      this.timeout = null;
    }

    if (queue.length == 0) {
      return this.queueFinished(msg);
    }

    const stream = await this.soundcloud.stream(song.media);
    const voiceChannel = msg.member.voice.channel;

    try {
      this.connection = await voiceChannel.join();
    } catch (e) {
      await this.queue.delete(msg.guild.id);
      return console.error(e);
    }

    const playerObj = {
      playingMsg: null,
      connection: null,
      dispatcher: null,
      timer: null,
      volume: 1,
      channel: msg.channel,
      voiceChannel,
    }

    if (!this.player.has(msg.guild.id)) {
      this.player.set(msg.guild.id, playerObj);
    }

    const player = this.player.get(msg.guild.id);
    const trackObj = queue.slice(0).shift();

    if (!trackObj.repeat) {      
      player.playingMsg = await msg.channel.send(
        new MessageEmbed()
          .setColor(this.color)
          .setDescription(msg.locale.NOW_PLAYING(trackObj))
          .setFooter(msg.locale.REQUESTED_BY(trackObj.requester))
      );
    }

    try {
      const dispatcherObj = {
        volume: player.volume,
        bitrate: voiceChannel.bitrate
      }

      const me = msg.guild.me.voice;

      if (!me.selfDeaf) me.setSelfDeaf(true);

      player.connection = this.connection;
      player.dispatcher = this.connection.play(stream, dispatcherObj);

      player.dispatcher.on('finish', () => this.finish(msg, queue, player));
    } catch (e) {
      return console.log(e);
    }
  }

  async finish(msg, queue, player) {
    const trackObj = queue.shift();

    if (!trackObj.repeat) {
      await player.playingMsg.delete();
      await this.queue.set(msg.guild.id, queue);
    }

    this.play(queue, msg);
  }

  async queueFinished(msg) {
    await msg.channel.send(msg.locale.NOTHING_IN_QUEUE);

    this.disconnect(msg);
  }
}