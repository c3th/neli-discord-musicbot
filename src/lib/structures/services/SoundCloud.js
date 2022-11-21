const axios = require('axios');

const Playlist = require('../entities/Playlist');
const Track = require('../entities/Track');

const error = {
  notFound: 404
}

module.exports = class SoundCloud {
  constructor(client) {
    this.api = client.constants.soundcloud.api;
    this.id = client.constants.soundcloud.key;
    // this.util = client.utils;
  }

  async getTrack(query, user) {
    const _playlist = (playlistId) => this.api + `/playlists/${playlistId}?client_id=${this.id}`;
    const _trackIds = (trackIds) => this.api + `/tracks?ids=${encodeURI(trackIds)}&client_id=${this.id}`;
    const _track = (trackId) => this.api + `/tracks/${trackId}?client_id=${this.id}`;
    const _search = (query) => this.api + `/search/tracks?q=${encodeURI(query)}&limit=1&client_id=${this.id}`;
    
    const playlistRgx = /(?<="uri":\"https?:\/\/api\.soundcloud\.com\/playlists\/)(.*?)(?=")/;
    const trackRgx = /(?<="urn":\"soundcloud:tracks:)(.*?)(?=")/;
    const urlRgx = /https?:\/\/soundcloud\.com\/\S*/gi;

    const urlMatch = query.match(urlRgx);

    if (!urlMatch) {
      const { data: { collection } } = await axios.get(_search(query));

      if (collection.length == 0) {
        return { code: error.notFound };
      }

      return new Track(collection.shift(), user);
    }

    const url = urlMatch.shift();
    const soundcloudResponse = await axios.get(url).catch(o_O => { });

    if (!soundcloudResponse || !trackRgx.test(soundcloudResponse.data)) {
      return { code: error.notFound };
    }

    if (url.includes('/sets/')) {
      const playlistId = soundcloudResponse.data.match(playlistRgx).shift();

      const { data } = await axios.get(_playlist(playlistId)).catch(o_O => { });
      const trackIDChunk = this.util.chunk(data.tracks.filter(x => x.id).map(x => x.id), 50);

      const newPlaylist = new Playlist(data, user);

      for (const trackID of trackIDChunk) {
        const { data } = await axios.get(_trackIds(trackID));

        for (const track of data.filter(x => x.media.transcodings.shift()).map(x => new Track(x, user))) {
          await newPlaylist.tracks.push(track);
        }
      }

      return newPlaylist;
    }

    const trackId = soundcloudResponse.data.match(trackRgx).shift();
    const { data } = await axios.get(_track(trackId));

    return new Track(data, user);
  }

  async stream(url) {
    const { data } = await axios.get(url + `?client_id=${this.id}`);

    return data.url;
  }
}