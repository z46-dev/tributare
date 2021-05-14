const Discord = require("discord.js");
const config = require("../config.json");
const util = require("../util.js");

module.exports = {
  run: function(bot, message, args) {
    let selfroles = [
        "Red",
        "Orange",
        "Yellow",
        "Lime",
        "Green",
        "Aqua",
        "Cyan",
        "Blue",
        "Dark Blue",
        "Purple",
        "Pink",
        "Black",
        "Grey",
        "Brown"
    ];
    if (!args.length) return util.error(message, "You need to specify ``add`` or ``remove`` or ``roles``");
    let dir = args.shift();
    if (!args.length && dir !== "roles") return error(message, "You need to specify a role!");
    args = args.join(" ");
    if (!selfroles.includes(args) && dir !== "roles") return util.error(message, "That role is not available or does not exist!\nPlease use proper capitalization and spelling!");
    let role = message.guild.roles.cache.find(role => role.name === args);
    if (dir === "add") {
      if (message.member.roles.cache.has(role.id)) return util.error(message, "You already have that role!");
      const user = message.member.user;
      if (!user) return util.error(message, "What the actual fuck.");
      const member = message.guild.member(user);
      member.roles.add(role).catch(console.log);
      return util.success(message, "I have added the role!");
    } else if (dir === "remove") {
      if (!message.member.roles.cache.has(role.id)) return util.error(message, "You don't have that role!");
      const user = message.member.user;
      if (!user) return util.error(message, "What the actual fuck.");
      const member = message.guild.member(user);
      member.roles.remove(role).catch(console.log);
      return util.success(message, "I have removed the role!");
    } else if (dir === "roles") return util.info(message, "Roles are: " + selfroles.map(role => message.guild.roles.cache.find(entry => entry.name === role)).join(", "));
    return util.error(message, "That is not a valid use. Do ``>>help selfrole`` for more info!");
  },
  description: "Adds, removes or lists selfroles.",
  usage: "selfrole <add, remove or roles> [role name]"
};
