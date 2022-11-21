const Command = require('./Command');

module.exports = class MusicCommand extends Command {
  constructor(client, dataObj) {
    super(client, dataObj);

    this.playerActive = dataObj.playerActive || false;
    this.chatLock = dataObj.chatLock || false;
    this.voiceLock = dataObj.voiceLock || false;
    this.joinVoice = dataObj.joinVoice || false;
    this.botJoinVoice = dataObj.botJoinVoice || false;
    this.dj = dataObj.dj || false;
  }
}