module.exports = class Language {
  constructor(client, data = {}) {
    this.author = data.author || 'Dream';
    this.language = data.language || null;
    this.name = data.name || null;
  }
}