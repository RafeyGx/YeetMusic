const {
	Client,
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	WebhookClient,
} = require("discord.js");

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
		//                                   Memtion Embed                                                                       //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		let prefix = client.config.prefix;
		const row = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel("Sex?")
				.setURL("https://discord.gg/")
				.setStyle("LINK"),
			new MessageButton()
				.setLabel("Sex")
				.setURL("https://raf.com")
				.setStyle("LINK")
		);

		const mentionEmbed = new MessageEmbed()
			.setColor("#cc3311")
			.setDescription(
				`My Prefix \`${prefix}\`\nMy Dad Went to buy milk but never retured please find him :(((`
			);

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
			return client.logger.log(
				`${message.member} can't access owner commands`,
				"error"
			);
		}

		if (!command) return;
		await command.run(client, message, args);
	}
}

