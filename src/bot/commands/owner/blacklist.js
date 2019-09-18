const { Command } = require('discord-akairo');

class BlacklistCommand extends Command {
  constructor() {
    super('blacklist', {
      aliases: ['blacklist'],
      category: 'owner',
      ownerOnly: true,
      channel: ['guild', 'dm'],
      description: {
        content: 'Makes me hate you even more.',
        usage: '<id | username | mention>',
        examples: ['462219867467022347', '@ someone']
      },
      args: [
        {
          id: 'user',
          type: 'user',
          prompt: {
            start: 'Whom?',
            retry: 'Seems like an invalid user.'
          }
        }
      ]
    });
  }

  async exec(message, { user }) {
    const res = await this.client.store.get(message.guild, 'blacklist', []);
    const blacklist = typeof res === 'string' ? JSON.parse(res) : res;
    if (blacklist.includes(user.id)) {
      const index = blacklist.indexOf(user.id);
      blacklist.splice(index, 1);
      await this.client.store.set(message.guild.id, 'blacklist', blacklist);
      return message.util.send(`**${user.tag}** has been removed from the blacklist.`);
    }
    blacklist.push(user.id);
    await this.client.store.set(message.guild.id, 'blacklist', blacklist);
    return message.util.send(`**${user.tag}** has been added to the blacklist.`);
  }
}

module.exports = BlacklistCommand;
