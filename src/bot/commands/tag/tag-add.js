const { Command } = require('discord-akairo');

class TagAddCommand extends Command {
  constructor() {
    super('tag-add', {
      category: 'tags',
      ownerOnly: false,
      channel: 'guild',
      args: [
        {
          id: 'name',
          type: 'lowercase',
          prompt: {
            start: message => `${message.author}, enter the tag name.`,
            retry: message =>
              `${message.author}, you have to enter tag name so you're able to find that it later.`
          }
        },
        {
          id: 'content',
          match: 'rest',
          prompt: {
            start: message => `${message.author}, enter tag content.`,
            retry: message => `${message.author}, tag must have some content.`
          }
        }
      ]
    });
  }

  async exec(message, { name, content }) {
    if (name && name.length >= 255) {
      return message.util.reply('tag name must be less then 255 characters.');
    }
    if (content && content.length >= 1900) {
      return message.util.reply('tag content must be less then 1900 characters (discord limits).');
    }

    const guildID = message.guild.id;
    const author = message.author.id;
    const tag = await this.client.store.Tag.findOne({ where: { name, guildID } });
    if (tag) {
      tag.toJSON();
      const isAuthor = tag.author === author;
      const reply = `Tag with such name already exists in this guild. ${
        isAuthor ? 'But as that tag owner you can edit it with `tag-edit`' : ''
      }`;
      return message.util.send(reply);
    }

    const userTagCount = await this.client.store.Tag.count({
      where: { guildID, author }
    });
    if (userTagCount === 2 && author !== this.client.ownerID) {
      return message.util.reply(
        'you have reached max tag count for this guild. You must edit or delete your existing tags.'
      );
    }

    await this.client.store.Tag.create({
      guildID,
      author,
      name,
      content
    });
    return message.util.send('Tag succesfuly created.');
  }
}

module.exports = TagAddCommand;
