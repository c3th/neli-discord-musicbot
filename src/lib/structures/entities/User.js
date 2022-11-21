class User {
  constructor(data) {
    this.username = data.username;
    this.avatar = data && data.avatar_url ? data.avatar_url.replace('large.jpg', 't500x500.jpg') : null;
    this.url = data.permalink_url;
    this.id = data.id;
  }
}

module.exports = User;