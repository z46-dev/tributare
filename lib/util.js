/*
* Utility functions that help us out a lot.
* These functions range from simple logs to permission checks.
*/

// General Requires
const Discord = require("discord.js");
const config = require("./config.json");

// Basic logging. Needs the bot to reference, channel ID and a message to send.
function log(bot, channelID, message) {
    message = `**[${new Date()}]:** ${message}`;
    const channel = bot.channels.cache.get(channelID);
    if (!channel) {
        console.log("Unable to get channel:", channelID);
        console.log(message);
        return;
    }
    console.log(message);
    return channel.send(message);
};

// Util functions that work for messages.

function unauth(message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Unauthorized!")
        .setColor(0xFF0000)
        .setDescription("You are unauthorized to use this command.")
        .setFooter('Powered by Discord.js', 'https://i.imgur.com/wSTFkRM.png');
    message.channel.send(embed);
};

function error(message, errorText) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Uh, Oh!")
        .setColor(0xFF0000)
        .setDescription(errorText)
        .setFooter('Powered by Discord.js', 'https://i.imgur.com/wSTFkRM.png');
    message.channel.send(embed);
};

function success(message, content) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Success!")
        .setColor(0x00FF00)
        .setDescription(content)
        .setFooter('Powered by Discord.js', 'https://i.imgur.com/wSTFkRM.png');
    message.channel.send(embed);
};

function info(message, content) {
    const embed = new Discord.MessageEmbed()
        .setTitle("Info:")
        .setColor(0x0055FF)
        .setDescription(content)
        .setFooter('Powered by Discord.js', 'https://i.imgur.com/wSTFkRM.png');
    message.channel.send(embed);
};

// Gets the permission integer for the user who sent the message.
function checkPermissions(message) {
    let roles = message.member.roles.cache;
    for (let role in config.rolePermissions) {
        let permissions = config.rolePermissions[role];
        if (roles.some(r => r.id === role)) return permissions;
    }
    return 0;
};

module.exports = {
    log,
    error,
    checkPermissions,
    unauth,
    error,
    success,
    info
};
