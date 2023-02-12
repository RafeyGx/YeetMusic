const { WebhookClient, MessageEmbed, version } = require('discord.js');
require("discord.js");

module.exports = {
	name: "ready",
	run: async (client) => {
		const readylogs = new WebhookClient({ url: "https://discord.com/api/webhooks/1073585682666225665/06_ue3wEBR2K6IY861Ok4U9cGNd0MNtQaHc0xe29eU-uk93wRadinzXqpqtYYMtLOsMM" })

		const readyEmbed = new MessageEmbed()
			//.setTitle(`${client.user.tag} has Started up!`)
			.setDescription(`>>> **Bot User: ${client.user.tag}\nGuild(s): ${client.guilds.cache.size} Servers\nWatching: ${Math.ceil(client.users.cache.size / 1000)}k Members\nPrefix: ${client.config.prefix}\nCommands: ${client.commands.size}\nSlash Commands: ${client.slashCommands.size}\nDiscord.js: v${version}\nNode.js: ${process.version}\nPlattform: ${process.platform} ${process.arch}\nMemory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB**`)
			.setTimestamp()
			.setFooter({ text: 'Report: Online and Running', iconURL: 'https://cdn.discordapp.com/emojis/1041461499446706216.png' });

		readylogs.send({ embeds: [readyEmbed] })


		//client.logger.ready(`Bot User: ${client.user.tag}\nGuild(s): ${client.guilds.cache.size} Servers\nWatching: ${Math.ceil(client.users.cache.size / 1000)}k Members\nPrefix: ${client.config.prefix}\nCommands: ${client.commands.size}\nSlash Commands: ${client.slashCommands.size}\nDiscord.js: v${version}\nNode.js: ${process.version}\nPlattform: ${process.platform} ${process.arch}\nMemory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`)

		console.table({
			'Bot User:': `${client.user.tag}`,
			'Guild(s):': `${client.guilds.cache.size} Servers`,
			'Watching:': `${client.guilds.cache.reduce((a, b) => a + b?.memberCount, 0)} Members`,
			'Prefix:': `${client.config.prefix}`,
			'Commands:': `${client.commands.size}`,
			'Discord.js:': `v${version}`,
			'Node.js:': `${process.version}`,
			'Plattform:': `${process.platform} ${process.arch}`,
			'Memory:': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
		});

		let activites = [
			//`${client.config.prefix}help | on ${client.guilds.cache.size} Servers, with ${client.users.cache.size} Members`,
			//`${client.config.prefix}play | ${config.env.PREFIX || process.env.PREFIX}autoplay`,
			//`${client.config.prefix}invite | ${config.env.PREFIX || process.env.PREFIX}support`
			`test`,
							`test2`
		],
			i = 0;

		setInterval(() => {
			client.user.setActivity(`${activites[i++ % activites.length]}`)
		}, 5 * 60 * 1000);
	}
}