const { WebhookClient, MessageEmbed, version } = require('discord.js');
require("discord.js");

module.exports = {
	name: "ready",
	run: async (client) => {
		let statuses = ['/ping', `Prefix ${client.config.prefix}`];
		setInterval(function() {
			let status = statuses[Math.floor(Math.random() * statuses.length)];
			client.user.setPresence({
				activities: [
					{
						name: status,
						type: "PLAYING"
					}
				],
				status: "online"
			});
		}, 10000)


		const readylogs = new WebhookClient({ url: client.config.webhooks.ready })

		const readyEmbed = new MessageEmbed()
			.setTitle(`${client.user.tag} has Started up!`)
			.setColor(client.config.colors.success)
			.setFields([
				{
					name: "Guilds",
					value: `\`${client.guilds.cache.size} Servers\``,
				},
				{
					name: "Watching",
					value: `\`${client.users.cache.size} Members\``,
				},
				{
					name: "Prefix",
					value: `\`${client.config.prefix}\``,
				},
				{
					name: "Commands",
					value: `\`${client.commands.size}\``,
				},
				{
					name: "Slash Commands",
					value: `\`${client.slashCommands.size}\``
				},
				{
					name: "DiscordJs Version",
					value: `\`${version}\``
				},
				{
					name: "NodeJs Version",
					value: `\`${process.version}\``
				},
				{
					name: "Platform",
					value: `\`${process.platform} (${process.arch})\``
				},
				{
					name: "Memory",
					value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB\``
				}
			])
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
			'Platform:': `${process.platform} ${process.arch}`,
			'Memory:': `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`
		});

	}
}