const Language = require('../lib/structures/Language');

class English extends Language {
  constructor(...args) {
    super(...args, {
      author: 'matt',
      language: 'english',
      name: 'en-US'
    });

    /* Command descriptions */
    this._VOLUME = 'Change the volume.';
    this._STOP = 'Stops the music and leaves the voice channel.';
    this._SKIP = 'Skips the current track.';
    this._SHUFFLE = 'Shuffles the entire queue if more than 5.';
    this._RESUME = 'Resumes a paused track.';
    this._REPEAT = 'Repeats a track.';
    this._QUEUE = 'View the upcoming 10 tracks.';
    this._PLAYLIST = 'Adds tracks to your personal playlist.';
    this._PLAYING = 'Views information about the current playing song.';
    this._PLAY = 'Plays a track from SoundCloud.';
    this._PAUSE = 'Pauses a track.';
    this._JOIN = 'Joins a channel.';
    this._POST = 'Posts content from your favorite reddit.';
    this._EVAL = 'Evals code.';
    this._STATUS = 'Sets the bots status.';
    this._PING = 'Ping pong.';
    this._HELP = 'Sends this help message.';
    this._AFK = 'Let everyone know that you are AFK.';

    /* Embed texts */
    this.HELP_DESCRIPTION = (prefix) => `Displaying all available commands with a short description. \nUse ${prefix}help <command> for additional information.`;
    this._REQUESTED_BY = 'Requested by';
    this._DURATION = 'Duration';
    this._REPEATING = 'Is repeating';
    this._RAW_URL = 'Raw URL';
    this._COOLDOWN = 'Cooldown';
    this._DEVELOPER_MODE = 'Prohibited';
    this._CATEGORY = 'Category';
    this._PERMISSION = 'Permission';

    /* Command responses */
    this.PONG_RESPONSE = 'Pong.';
    this.TRACK_NOT_FOUND = (args) => `\`${args.join(' ')}\` was not found.`;
    this.QUEUE_VIEW_PLAYING = ([track]) => `Playing: **${track.title}** | **${track.requester}**`;
    this.QUEUE_VIEW_UPCOMING = ([, nextTrack]) => `Upcoming: **${nextTrack.title}** | **${nextTrack.requester}**`;
    this.QUEUE_VIEW_SONGS = (queue, _queue) => `Viewing **${queue.length}** of **${_queue.length}** songs.`;
    this.QUEUE_NEW_TRACK_ADDED = (queue) => `Added: **${queue[queue.length - 1].title}**`;
    this.QUEUE_PLAYLIST_ADDED = (playlist) => `Added: **${playlist.title}** with **${playlist.tracks.length}** tracks!`;
    this._QUEUE_VIEW_SONGS = (queue) => `Viewing **${queue.length}** ${queue.length > 1 ? 'songs' : 'song'}!`;
    this.NOW_PLAYING = (track) => `Playing: **${track.title}**`;
    this.SKIPPED_SONGS = (args) => `Skipped \`${args}\` ${args > 1 ? 'songs' : 'song'}`;
    this.SHUFFLED_TRACKS = (length) => `Shuffled \`${length}\` tracks!`;
    this.REPEATING_TRACK_TITLE = (title) => `Repeating **${title}**.`;
    this.ADDED_TRACKS = (user) => `Added tracks from \`${user.tag}\` playlist!`;
    this.REQUESTED_BY = (user) => `${this._REQUESTED_BY} ${user}`;
    this.ADDED_NEW_TRACK = (trackArray) => `Added \`${trackArray[trackArray.length - 1].title}\` to your playlist.`;
    this.VIEWING_USER_PLAYLIST = (user) => `Viewing **${user.tag}**'s saved tracks!`;
    this.PLAYLIST_SONGS = (playlist, _playlist) => `You have **${playlist.length}** saved of **${_playlist.length}** tracks saved.`;
    this._PLAYLIST_SONGS = (playlist) => `You have **${playlist.length}** saved ${playlist.length > 1 ? 'tracks' : 'track'}!`;
    this.INVALID_ARGUMENTS = 'Invalid arguments.';
    this.ALREADY_IN_CHANNEL = 'I\'m already in your voice channel!';
    this.TRACK_ALREADY_PAUSED = 'Track is currently paused.';
    this.EMPTY_PLAYLIST = 'Your playlist is empty! >_<';
    this.NOTHING_UPCOMING = 'Nothing upcoming...';
    this.TRACK_ALREADY_EXISTS = 'This track already exists within the queue.';
    this.TRACK_NOT_PAUSED = 'Track is not paused.';
    this.NOTHING_IN_QUEUE = 'There\'s nothing more in queue, you hvae 60 seconds to play something before I leave';
    this.NOT_REPEATING_TRACK = 'No longer repeating current track.';
    this.REPEAT_OFF = 'Repeat has been turned off';
    this.QUEUE_EXCEED = 'The queue needs to exceed `5`!';
    this.NO_TRACKS = 'You don\'t have any tracks to play!';
    this.COMMAND_NOT_FOUND = 'This command does not exist.';

    /* Inhibitor responses */
    this.REQUIRE_PERMISSIONS = (perms) => `For a better performence I require the following permissions: \`\`\`diff\n${perms.join('\n')}\n\`\`\``;
    this.TIME_LEFT = (time) => `You have **${time.toFixed(1)}s** left!`;
    this.PLAY_MUSIC = 'Play some music first!';
    this.MISSING_ARGS = 'You\'re missing arguments.';
    this.JOIN_CHANNEL = 'Please join a voice channel.';
    this.DEV_ONLY = 'You are not authorized to use this command.';
  }
}

module.exports = English;