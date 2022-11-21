const User = require('./User');

class Track {
  constructor(data, author) {
    this.title = data.title;
    this.requester = author.tag;
    this.repeat = false;
    this.url = data.permalink_url || null;
    this.duration = data.duration || null;
    this.background = data.artwork_url ? data.artwork_url.replace('large.jpg', 't500x500.jpg') : null;
    this.media = data.media && data.media.transcodings.length > 0 ? data.media.transcodings[0].url : null || data.streamUrl;
    this.id = data.id || null;
    this.kind = data.kind;
    this.comments = data.comment_count || null;
    this.likes = data.likes_count || null;
    this.reposts = data.reposts_count || null;
    this.user = data.user ? new User(data.user) : null;
  }
}

module.exports = Track;