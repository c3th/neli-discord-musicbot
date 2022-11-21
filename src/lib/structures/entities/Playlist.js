const User = require('./User');

class Playlist {
  constructor(data, author) {
    this.title = data.title;
    this.requester = author.tag;
    this.url = data.permalink_url;
    this.id = data.id;
    this.kind = data.kind;
    this.likes = data.likes_count;
    this.user = new User(data.user);
    this.tracks = [];
  }
}

module.exports = Playlist;