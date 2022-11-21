const { Music } = require('..');

const { MessageEmbed } = require('discord.js');

module.exports = class Join extends Music {
  constructor(...args) {
    super(...args, {
      name: 'join',
      desc: locale => locale._JOIN,
      aliases: ['connect'],
      inhibitors: [
        'djOnly',
        'memberInVoice',
        'playerActive'
      ]
    });
  }

  async run(msg, { music, embed }) {
    const getPlayer = music.player.get(msg.guild.id);
    const getQueue = music.queue.get(msg.guild.id);
    
    const botVoiceChannel = msg.guild.me.voice.channel;
    const voiceChannel = msg.member.voice.channel;

    if (botVoiceChannel == voiceChannel) {
      return msg.channel.send(
        new MessageEmbed()
          .setColor(embed.color)
          .setDescription(msg.locale.ALREADY_IN_CHANNEL)
      );
    }

    if (getPlayer.dispatcher.paused) {
      await getPlayer.connection.voice.setSelfMute(false);
      await getPlayer.dispatcher.resume();
    }

    await msg.react('👍');

    if (getQueue.length) {
      await getPlayer.connection.voice.setSelfMute(false);

      return music.play(getQueue, msg);
    } else {
      await voiceChannel.join();

      getPlayer.voiceChannel = voiceChannel;
    }
  }
}