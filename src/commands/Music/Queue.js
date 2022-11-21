const { Music } = require('..');

const moment = require('moment');

module.exports = class Queue extends Music {
  constructor(...args) {
    super(...args, {
      name: 'queue',
      desc: locale => locale._QUEUE,
      aliases: ['q'],
      inhibitors: [
        'playerActive'
      ]
    });
  }

  async run(msg, { music, util }) {
    const _queue = music.queue.get(msg.guild.id);
    const queue = await this.buildQueue(_queue, util);

    const e = [
      msg.locale.QUEUE_VIEW_PLAYING(_queue),
      `${_queue.length > 1 ? msg.locale.QUEUE_VIEW_UPCOMING(_queue) : msg.locale.NOTHING_UPCOMING}`,
      '```nim',
      queue.join('\n'),
      '```',
      _queue.length > 10 ? msg.locale.QUEUE_VIEW_SONGS(queue, _queue) : msg.locale._QUEUE_VIEW_SONGS(queue)
    ]

    return msg.channel.send(e);
  }

  async buildQueue(array, util) {
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