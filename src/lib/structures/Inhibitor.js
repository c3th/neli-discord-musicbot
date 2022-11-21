module.exports = class Inhibitor {
  constructor(client, data = {}) {
    this.client = client;

    this.name = data.name || null;
    this.category = data.category || null;
  }
}