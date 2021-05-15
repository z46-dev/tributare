// Import everything.
const Discord = require("discord.js");
const config = require("../config.json");
const util = require("../util.js");

module.exports = {
    run: function(bot, message, args) {
        if (util.checkPermissions(message) < 3) return util.unauth(message);
        args = args.join(" ");
        let output;
        try {
            output = eval(args);
        } catch (err) {
            return util.error(message, `\`\`\`js\n${err}\`\`\``);
        }
        return util.info(message, `\`\`\`js\n${output}\`\`\``);
    },
    description: "Runs some code.",
    usage: "eval <code>"
};
