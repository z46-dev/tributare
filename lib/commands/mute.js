// Import everything.
const Discord = require("discord.js");
const config = require("../config.json");
const util = require("../util.js");

module.exports = {
    run: function(bot, message, args) {
        if (util.checkPermissions(message) < 1) return util.unauth(message);
        const user = message.mentions.users.first();
        if (!user) return util.error(message, "You need to specify a valid user!");
        const member = message.guild.member(user);
        let isStaff = member.roles.cache.some(r => [config.roles.moderator, config.roles.admin].includes(r.id));
        if (isStaff) return util.error(message, "You can't mute a staff member!");
        member.roles.add(message.guild.roles.cache.find(r => r.name === "Muted")).catch(e => util.error(message, "I was unable to add the role to the user!"));
        util.success(message, "That user is now muted!");
        args.shift();
        util.log(bot, config.channels.moderationLogs, `**<@${message.member.id}> muted ${user.tag} for ${args.join(" ")}**`, true);
    },
    description: "Mutes a user.",
    usage: "mute <user ID or mention> <reason>"
};
