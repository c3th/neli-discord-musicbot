const UserModel = require('../../models/UserModel');

module.exports = class CasinoManager {
  constructor(client) {
    this.client = client;
  }

  async createUser(userId) {
    const createdUser = new UserModel({ id: userId });

    await createdUser.save();
    return createdUser;
  }

  async getUser(userId) {
    const user = await UserModel.findOne({ id: userId });

    if (!user) return await this.createUser(userId);

    return user;
  }
}