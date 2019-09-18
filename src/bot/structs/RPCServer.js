const Mali = require('mali');
const { join } = require('path');
const protoPath = join(__dirname, '../..', 'proto/services.proto');

module.exports = class RPCServer extends Mali {
  constructor(client) {
    super(protoPath, 'GuildFetcher');

    this.client = client;

    this.fetchGuilds = ctx => {
      const res = [];
      this.client.guilds.each(guild => {
        res.push({ id: guild.id, name: guild.name, icon: guild.icon });
      });
      ctx.res = { guilds: res };
    };

    this.fetchGuild = ctx => {
      const guild = this.client.guilds.get(ctx.req.ID);
      const res = guild.toJSON();
      ctx.res = res;
    };

    this.fetchChannels = ctx => {
      const res = [];
      for (const id of ctx.req.IDs) {
        res.push(this.client.channels.get(id).toJSON());
      }
      ctx.res = { channels: res };
    };

    this.fetchChannel = ctx => {
      const channel = this.client.channels.get(ctx.req.ID);
      const res = channel.toJSON();
      ctx.res = res;
    };

    this.fetchMembers = ctx => {
      const res = [];
      for (const id of ctx.req.IDs) {
        res.push(
          this.client.guilds
            .get(ctx.req.guildID)
            .members.get(id)
            .toJSON()
        );
      }
      ctx.res = { members: res };
    };

    this.fetchMember = ctx => {
      const member = this.client.guilds.get(ctx.req.guildID).members.get(ctx.req.ID);
      const res = member.toJSON();
      ctx.res = { members: res };
    };

    this.fetchRoles = ctx => {
      const res = [];
      for (const id of ctx.req.IDs) {
        res.push(
          this.client.guilds
            .get(ctx.req.guildID)
            .roles.get(id)
            .toJSON()
        );
      }
      ctx.res = { roles: res };
    };

    this.fetchRole = ctx => {
      const role = this.client.guilds.get(ctx.req.guildID).roles.get(ctx.req.ID);
      const res = role.toJSON();
      ctx.res = { roles: res };
    };

    this.fetchUsers = ctx => {
      const res = [];
      for (const id of ctx.req.IDs) {
        res.push(this.client.users.get(id).toJSON());
      }
      ctx.res = { users: res };
    };

    this.fetchUser = ctx => {
      const user = this.client.users.get(ctx.req.ID);
      const res = user.toJSON();
      ctx.res = res;
    };

    this.say = ctx => {
      this.client.commandHandler.runCommand(null, this.client.commandHandler.findCommand('say'), ctx.req);
      ctx.res = null;
    };
  }

  init() {
    this.use(this.client.prometheus.rpcMiddleware);
    this.use({ fetchGuilds: this.fetchGuilds });
    this.use({ fetchGuild: this.fetchGuild });
    this.use({ fetchChannels: this.fetchChannels });
    this.use({ fetchChannel: this.fetchChannel });
    this.use({ fetchMembers: this.fetchMembers });
    this.use({ fetchMember: this.fetchMember });
    this.use({ fetchRoles: this.fetchRoles });
    this.use({ fetchRole: this.fetchRole });
    this.use({ fetchUsers: this.fetchUsers });
    this.use({ fetchUser: this.fetchUser });
    this.use({ say: this.say });
  }

  listen() {
    this.init();
    this.start('0.0.0.0:50051');
  }
};
