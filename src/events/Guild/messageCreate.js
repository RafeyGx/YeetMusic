const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "messageCreate",
	run: async (client, message) => {
		if (!message.inGuild()) return false;
		if (!message.guild) return false;
		if (!message.guild.me.permissions.has("EMBED_LINKS")) return false;
		if (!message.guild.me.permissions.has("SEND_MESSAGES")) return false;
		if (
			message.content.includes("@here") ||
			message.content.includes("@everyone") ||
			message.type === "REPLY" ||
			message.author.bot
		)
			return false;

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//                                                                                                                       //
		//                                   Mention Embed                                                                       //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		let prefix = client.config.prefix;
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel("Github")
				.setURL("https://github.com/RafeyGx/YeetMusic")
				.setStyle("LINK"),
			new MessageButton()
				.setLabel("Support Server")
				.setURL("https://discord.gg/")
				.setStyle("LINK")
		);

		const mentionEmbed = new MessageEmbed()
			.setColor("#cc3311")
			.setDescription(`>>> **My Prefix for this server is \`${prefix}\`\nIf you Enjoy Using the bot consider leaving a star in github.**`);

		if (message.content.startsWith(`<@${client.user.id}>`) === true) {
			message.reply({
				components: [row],
				embeds: [mentionEmbed],
			});
		}

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//                                                                                                                       //
		//                                                     Message Prefix                                                    //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		if (
			message.author.bot ||
			!message.guild ||
			!message.content.toLowerCase().startsWith(client.config.prefix)
		)
			return;

		const [cmd, ...args] = message.content
			.slice(client.config.prefix.length)
			.trim()
			.split(/ +/g);

		const commandName = cmd.toLowerCase();
		const command =
			client.commands.get(cmd.toLowerCase()) ||
			client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase())) ||
			client.commands.find(
				(cmd) => cmd.cooldowns && cmd.cooldowns.includes(commandName)
			) ||
			client.commands.find(
				(cmd) => cmd.category && cmd.category.includes(commandName)
			);
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//                                                                                                                       //
		//                                     Owner Only Commands                                                               //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		const ownerID = client.config.ownerID;

		if (command.ownerOnly && !ownerID.includes(message.author.id)) {
			return console.error(`${message.member} can't access owner commands`);
		}

		if (!command) return;
		await command.run(client, message, args);
	}
}

