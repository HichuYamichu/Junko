const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command {
  constructor() {
    super('help', {
      aliases: ['help'],
      category: 'info',
      ownerOnly: false,
      channel: ['guild', 'dm'],
      description: {
        content: 'Helps you.',
        usage: '*<command>',
        examples: ['ping', 'stats', 'image']
      },
      args: [
        {
          id: 'command',
          type: 'commandAlias'
        }
      ],
      clientPermissions: ['EMBED_LINKS']
    });
  }

  async exec(message, { command }) {
    const prefix = await this.handler.prefix(message);
    if (!command) {
      const embed = new MessageEmbed()
        .setColor('#fc2041')
        .addField(
          'More help',
          `You can send \`${prefix}help [command name]\` to get info on a specific command!`
        )
        .addField(
          'Notation',
          `\`[thing1 | thing2]\` - include one of the options literally
      \`<thing>\` - fill with appropriate content
      \`<thing1 | thing2>\` - multiple content types available
      \`*<thing>\` - parameter is optional or has a default value`
        )
        .addBlankField();

      for (const category of this.handler.categories.values()) {
        if (category.id === 'passive') continue;
        embed.addField(
          category.id.replace(/(\b\w)/gi, lc => lc.toUpperCase()),
          `${category
            .filter(cmd => cmd.aliases.length > 0)
            .map(cmd => `\`${cmd.aliases[0]}\``)
            .join(' ')}`
        );
      }

      return message.util.send(embed);
    }

    const embed = new MessageEmbed()
      .setColor('#fc2041')
      .setTitle(
        `\`${command.aliases[0]} ${command.description.usage ? command.description.usage : ''}\``
      )
      .addField('Description:', command.description.content);

    if (command.description.examples && command.description.examples.length) {
      embed.addField(
        'Examples:',
        `\`${command.aliases[0]} ${command.description.examples.join(
          `\`\n\`${command.aliases[0]} `
        )}\``,
        true
      );
    }
    if (command.aliases.length > 1) {
      embed.addField('Aliases:', `\`${command.aliases.join('` `')}\``, true);
    }

    return message.util.send(embed);
  }
}

module.exports = HelpCommand;
