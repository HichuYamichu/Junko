const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Sends user avatar',
  args: false,
  usage: '<mention OR username OR id>',
  guildOnly: true,
  cooldown: 10,
  permissionLVL: 0,
  async execute(message, args) {
    const user =
      message.mentions.users.first() ||
      message.client.users.find(u => u.username === args[0]) ||
      message.client.users.get(args[0]) ||
      message.author;

    const embed = new MessageEmbed().setImage(user.avatarURL({ size: 2048 })).setColor('#fc2041');
    message.channel.send(embed);
  }
};
