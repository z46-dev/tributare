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
        member.roles.remove(message.guild.roles.cache.find(r => r.name === "Muted")).catch(e => util.error(message, "I was unable to remove the role from the user!"));
        util.success(message, "That user is now unmuted!");
        args.shift();
        util.log(bot, config.channels.moderationLogs, `**<@${message.member.id}> unmuted ${user.tag}.**`);
    },
    description: "Unmutes a user.",
    usage: "unmute <user ID or mention>"
};
