const { Inhibitor } = require('..');

module.exports = class hasPermissions extends Inhibitor {
  constructor(...args) {
    super(...args, {
      name: 'hasPermissions'
    });
  }

  async run(msg, { constants }) {
    const perms = [];
    
    for (const permission of constants.permissions) {
      const hasPermission = msg.guild.me.hasPermission(permission);

      if (!hasPermission) perms.push(`- ${permission}`);
    }

    if (perms.length) return msg.locale.REQUIRE_PERMISSIONS(perms);
  }
}