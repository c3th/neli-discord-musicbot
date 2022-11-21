const EventEmitter = require('events');
const axios = require('axios');

const Reddit = require('../services/Reddit');

class EventManager extends EventEmitter {
  constructor(client) {
    super();

    this.events = client.constants.events;
    this.api = client.constants.api;
    this.client = client;

    this.reddit = new Reddit(this);
  }

  _call(url) {
    return new Promise((resolve, reject) => {
      return axios.get(url).then(({ data }) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

module.exports = EventManager;