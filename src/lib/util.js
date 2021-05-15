/*
* Utility functions that help us out a lot.
* These functions range from simple logs to permission checks.
*/

// General Requires
const Discord = require("discord.js");
const config = require("./config.json");

/**
 * Creates and Embed with the paramerters given.
 * @param {string} title The title of the embed.
 * @param {number} color The color of the embed.
 * @param {string} description The description of the embed.
 * @returns {Discord.MessageEmbed} The embed generated
 * @author Sopur
 * I was too lazy to improve the other files
 */
function getEmbed(title, color, description) {
    return new Discord.MessageEmbed()
    .setTitle(title)
    .setColor(color)
    .setDescription(description)
    .setFooter('Powered by Discord.js', 'https://i.imgur.com/wSTFkRM.png');
};

// Basic logging. Needs the bot to reference, channel ID and a message to send.
function log(bot, channelID, message) {
    const channel = bot.channels.cache.get(channelID);
    console.log(new Date() + " : " + message);
    if (channel === undefined) {
        console.warn("Unable to get channel:", channelID);
        return;
    };
    return channel.send(
        getEmbed(
            new Date(),
            0x999999,
            message
        )
    );
};

// Util functions that work for messages.

/**
 * Sends an unauthorized warning embed.
 * @param {Discord.Message} message Discord message context.
 */
function unauth(message) {
    message.channel.send(
        getEmbed(
            "Unauthorized!",
            0xFF0000,
            "You are unauthorized to use this command."
        )
    );
};

/**
 * Sends a error warning embed.
 * @param {Discord.Message} message Discord message context.
 * @param {string} errorText The text to send as the description.
 */
function error(message, errorText) {
    message.channel.send(
        getEmbed(
            "Uh, Oh!",
            0xFF0000,
            errorText
        )
    );
};

/**
 * Sends a success embed.
 * @param {Discord.Message} message Discord message context.
 * @param {string} content The text to send as the description.
 */
function success(message, content) {
    message.channel.send(
        getEmbed(
            "Success!",
            0x00FF00,
            content
        )
    );
};

/**
 * Sends an info embed.
 * @param {Discord.Message} message Discord message context.
 * @param {string} content The text to send as the description.
 */
function info(message, content) {
    message.channel.send(
        getEmbed(
            "Info:",
            0x0055FF,
            content
        )
    );
};

// Gets the permission integer for the user who sent the message.
function checkPermissions(message) {
    const roles = message.member.roles.cache;
    for (const role in config.rolePermissions) {
        if (roles.some((targetRole) => targetRole.id === role)) return config.rolePermissions[role];
    };
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
