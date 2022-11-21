const { Music } = require('..');

const moment = require('moment');
const trackArray = [];

module.exports = class Playlist extends Music {
  constructor(...args) {
    super(...args, {
      name: 'playlist',
      desc: locale => locale._PLAYLIST,
      aliases: ['pl'],
      inhibitors: [
        'devOnly'
      ]
    });
  }

  async run(msg, { args, music, util }) {
    const queue = music.queue.get(msg.guild.id);

    switch (args[0]) {
      case 'play': {
        const _playlist = music.playlist.get(msg.author.id);

        if (!_playlist) return msg.channel.send(msg.locale.NO_TRACKS);

        if (!queue) {
          await music.queue.set(msg.guild.id, _playlist);
        } else {
          await music.queue.get(msg.guild.id).push(_playlist);
        }

        await msg.channel.send(msg.locale.ADDED_TRACKS(msg.author));

        return music.play(_playlist, msg);
      }

      case 'add': {
        const _track = args.slice(1).join(' ');

        if (!_track && queue) {
          if (trackArray.find(__track => __track.title == queue[0].title)) {
            return msg.channel.send(msg.locale.TRACK_ALREADY_EXISTS);
          }

          await trackArray.push(queue[0]);
        } else if (_track) {
          const track = await music.soundcloud.getTrack(_track, msg.author);

          if (trackArray.find(__track => __track.title == track.title)) {
            return msg.channel.send(msg.locale.TRACK_ALREADY_EXISTS);
          }

          await trackArray.push(track);
        } else if (!_track && !queue) {
          return msg.channel.send(msg.locale.INVALID_ARGUMENTS);
        }

        await music.playlist.set(msg.author.id, trackArray);

        return msg.channel.send(msg.locale.ADDED_NEW_TRACK(trackArray));
      }

      default: {
        const _playlist = music.playlist.get(msg.author.id);

        if (!_playlist) return msg.channel.send(msg.locale.EMPTY_PLAYLIST);

        const builtPlaylist = await this.buildPlaylist(_playlist, util);

        const e = [
          msg.locale.VIEWING_USER_PLAYLIST(msg.author),
          '```nim',
          builtPlaylist.join('\n'),
          '```',
          _playlist.length > 10 ? msg.locale.PLAYLIST_SONGS(builtPlaylist, _playlist) : msg.locale._PLAYLIST_SONGS(builtPlaylist)
        ]

        return msg.channel.send(e);
      }
    }
  }

  async buildPlaylist(array, util) {
    const [split] = util.arrayChunk(array, 10);
    const _splitNames = split.map(track => track.title);
    const longest = _splitNames.reduce((long, str) => Math.max(long, str.length), 0);

    const queue = [];

    await split.map((track, i) => {
      queue.push(`${i + +1}) (${moment(track.duration).format('mm:ss')}) ${track.title.padEnd(longest)} | ${track.requester}`);
    });

    return queue;
  }
}