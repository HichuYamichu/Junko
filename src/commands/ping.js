module.exports = {
  name: 'ping',
  description: 'Ping!',
  args: false,
  usage: '<user> <role>',
  guildOnly: true,
  cooldown: 1,
  permissionLVL: 0,
  async execute(message, args) {
    const msg = await message.channel.send('Ping?');
    msg.edit(
      `Pong! Latency is ${msg.createdTimestamp -
        message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`
    );
  }
};
