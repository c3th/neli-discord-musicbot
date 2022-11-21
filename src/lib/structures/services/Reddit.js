module.exports = class Reddit {
  constructor(_event) {
    this.listeners = _event.client.listeners;
    this.redditUrl = _event.api.reddit.url;
    this._time = _event.events.timeout;
    this.client = _event.client;
    this.event = _event;

    this.timeout = null;
    this.utc = null;
  }

  async _start(msg) {
    if (this.listeners.has(msg.guild.id)) this.getLatestUpdates(msg);
  }

  async _callEvent(args) {
    const { data } = await this.event._call(this.redditUrl(args, 'hot', 1)).catch(o_O => { });

    if (!data) return;

    return data.children;
  }

  async getLatestUpdates(msg) {
    const listener = this.listeners.get(msg.guild.id);

    const [{ data }] = await this._callEvent(listener.sub);
    const utc = data.created_utc;

    if (this.utc != utc) {
      this.utc = utc;

      this.client.emit('newMeme', data, msg);
    }

    this.timeout = setTimeout(this._start.bind(this, msg), this._time);
  }
}