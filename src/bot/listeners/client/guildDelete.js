const { Listener } = require('discord-akairo');

class GuildDeleteListener extends Listener {
  constructor() {
    super('guildDelete', {
      emitter: 'client',
      event: 'guildDelete'
    });
  }

  async exec(guild) {
    await this.client.store.clear(guild.id);
    this.client.logger.info(`Guild ${guild.name} {${guild.id}} has been deleted.`);
  }
}

module.exports = GuildDeleteListener;
