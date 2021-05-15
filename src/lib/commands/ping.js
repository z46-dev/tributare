// Import everything.
const Discord = require("discord.js");
const config = require("../config.json");
const util = require("../util.js");

module.exports = {
    run: function(bot, message, args) {
        return message.reply("Pong!");
    },
    description: "Pings the bot.",
    usage: "ping"
};
