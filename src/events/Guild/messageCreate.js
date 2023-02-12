const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, WebhookClient } = require('discord.js');
const { msgcooldown } = require(`${process.cwd()}/src/structures/functions`);

module.exports = {
	name: "messageCreate",
	run: async (client, message) => {

		if (!message.inGuild()) return false;
		if (!message.guild) return false;
		if (!message.guild.me.permissions.has('EMBED_LINKS')) return false;
		if (!message.guild.me.permissions.has('SEND_MESSAGES')) return false;
		if (message.content.includes("@here") || message.content.includes("@everyone") || message.type === "REPLY" || message.author.bot) return false;

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//                                                                                                                       //
		//                                   Memtion Embed                                                                       //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		let prefix = client.config.prefix;
		const row = new ActionRowBuilder().addComponents(
			new ButtonBuilder().setLabel("Github").setURL("https://github.com/RafeyGx/DistubeBot").setStyle("LINK"),
			new ButtonBuilder().setLabel("Replit").setURL("https://replit.com/@RafeyGx/Distube-Spotify-Music-Bot").setStyle("LINK")
		)

		const mentionEmbed = new EmbedBuilder()
			.setColor(client.config.colors.default)
			.setDescription(`My Prefix for this Server is \`${prefix}\`\nIf you Enjoy using this bot please star the project on Github!`)

		if (message.content.startsWith(`<@${client.user.id}>`) === true) {
			message.reply({
				components: [row], embeds: [mentionEmbed]
			})
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

		const [cmd,
			...args] = message.content
				.slice(client.config.prefix.length)
				.trim()
				.split(/ +/g);

		const commandName = cmd.toLowerCase();
		const command = client.commands.get(cmd.toLowerCase())
			|| client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()))
			|| client.commands.find(cmd => cmd.cooldowns && cmd.cooldowns.includes(commandName))
			|| client.commands.find(cmd => cmd.category && cmd.category.includes(commandName))
			;

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//                                                                                                                       //
		//                                     Pov ur command doesn't exist                                                      //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		if (!command) {
			return message.reply({
				embeds: [
					new EmbedBuilder()
						.setColor(client.config.colors.error)
						.setTitle(`${message.author.username} You have entered an invalid command!`)
						.setDescription(`The command \`${commandName}\` does not exist.\nPlease use \`${prefix}help\` to see all the commands.`)

				]
			}).then(m => setTimeout(() => m.delete(), 6000));
		}

		

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//                                                                                                                       //
		//                                     Owner Only Commands                                                               //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		const ownerID = client.config.ownerID

		if (command.ownerOnly && !ownerID.includes(message.author.id)) {
			return console.error(`[ Owner Commands ] ${message.member} tried to access owner commands`)
		}

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//                                                                                                                       //
		//                                     Cooldown Check xd                                                                 //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		/*if (msgcooldown(message, command)) {
			return await message.reply({
				embeds: [
					new MessageEmbed()
						.setColor(client.embed.wrongcolor)
						.setTitle(`${message.author.username}, You have been cooldown for \`${command.cooldown}\` seconds!`)
						.setDescription(`Please wait \`${msgcooldown(message, command).toFixed(1)}\` Before using the \`${command.name}\` command again!`)
						.setFooter(`chill homie`, message.client.user.displayAvatarURL())
				]
			}).then(m => setTimeout(() => m.delete(), msgcooldown(message, command) * 1000));
		}*/

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//                                                                                                                       //
		//                                     Check who used the cmd                                                            //
		//                                                                                                                       //
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


		if (!command) return;
		await command.run(client, message, args);

		const cmdlogs = new WebhookClient({
			url: client.config.webhooks.msgcmd
		});
		if (!cmdlogs) return;
		cmdlogs.send({
			embeds: [new EmbedBuilder()
				.setColor(client.config.colors.default)
				.setFooter(`${message.guild.name} - (${message.guild.id})`, message.guild.iconURL({
					dynamic: true
				}))
				.setTitle(`[ ${client.config.prefix} ] Prefix Command`)
				.addDescription(`**Author: ${message.author.tag} - (${message.author.id})\nCommamd Name: ${command.name}`)

			]
		});
	}

};