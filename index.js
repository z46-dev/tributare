// Import everything.
const Discord = require("discord.js");
const config = require("./lib/config.json");
const util = require("./lib/util.js");

// Create the bot.
const bot = new Discord.Client();

// When our bot is online, we set it's activity.
bot.on("ready", async function() {
    bot.user.setActivity(`for commands (${config.prefix})`, {
        type: "WATCHING"
    });

    // Now we log that we started up in our logs channel.
    util.log(bot, config.channels.statusLogs, "Discord bot active.");
    require("./lib/slashCommands.js")(bot);
});

// We use folders for our commands so that it is all simple and split up.
let commands = {};
for (let command of [
    "ping",
    "selfrole",
    "mute",
    "unmute",
    "kick",
    "ban",
    "eval"
]) {
    let module = require(`./lib/commands/${command}.js`);
    commands[command] = module;
}

commands.help = (function() {
    let fields = [];
    for (let name in commands) {
        let command = commands[name];
        fields.push({
            name: name,
            value: `Description: **${command.description}**\nUsage: \`${config.prefix + command.usage}\``
        });
    }
    return {
        run: function(bot, message, args) {
            const embed = new Discord.MessageEmbed()
                .setTitle("Help:")
                .setColor(0x55FF)
                .addFields(...fields)
                .setDescription("Here is a list of all commands that are usable:");
            message.channel.send(embed);
        },
        description: "Lists commands.",
        usage: config.prefix + "help"
    }
})();

async function messageEvent(message) {
    if (!message.content.startsWith(config.prefix)) return;
    if (message.author.bot) return;
    let args = message.content.split(" ");
    let command = args.shift().slice(config.prefix.length);
    if (commands[command]) return commands[command].run(bot, message, args);
    util.error(message, "That command doesn't exist!");
};

bot.on("message", messageEvent);

bot.login(process.env.bot_token);
