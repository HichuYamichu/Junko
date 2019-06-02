module.exports = {
  name: 'prefix',
  description: 'sets the prefix',
  args: true,
  usage: '<prefix>',
  guildOnly: true,
  cooldown: 5,
  permissionLVL: 2,
  async execute(message, args) {
    message.client.store.hsetAsync(message.guild.id, 'prefix', args[0]);
    message.channel.send(`My prefix is now \`${args[0]}\``);
  }
};