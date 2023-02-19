console.clear
const { Client, Collection } = require('discord.js');
const fs = require('fs');

// <|========================================| Initializing the 

const client = new Client({
	ws: {
		properties: {
			$browser: "Discord iOS",
		},
	},
	shards: "auto",
	intents: 32767,
	allowedMentions: {
		parse: ['users', 'roles'],
		repliedUser: true
	},
	autoReconnect: true,
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	restTimeOffset: 0
});

module.exports = client;

// <|========================================| Global Variables |========================================|>

/*const { Logger } = require(`./structures/logger.js`);
client.logger = new Logger({
  displayTimestamp: true,
  displayDate: true,
}, client);*/

client.config = require("./botconfig/config.js");
client.emotes = require("./botconfig/emojis.json");
client.embed = require("./botconfig/embed.json");
client.commands = new Collection();
client.slashCommands = new Collection();
client.events = new Collection();
client.aliases = new Collection();

if (!client.token) client.token = client.config.token;

// <|========================================| Connect to database |========================================|>

require('./databases/MongoDB/connect.js')();

// <|========================================| Initializing the Client |========================================|>

fs.readdirSync('./src/handlers').forEach((dir) => {
	fs.readdirSync(`./src/handlers/${dir}`).forEach((handler) => {
		require(`./handlers/${dir}/${handler}`)(client);
	});
});

// <|========================================| Login to the Client |========================================|>
client.login(client.token)