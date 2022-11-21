module.exports = class Event {
  constructor(client, data = {}) {
    this.client = client;
    
    this.name = data.name || null;
  }
}