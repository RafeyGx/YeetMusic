const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
	name: "ping",
	aliases: ['p'],
	description: "Shows Bot ping in WS",
	category: "info",
	ownerOnly: false,
	
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {

		await message.reply({ content: "Pinging..." }).then(async (msg) => {

			const pping = msg.createdAt - message.createdAt;
			const api_ping = client.ws.ping;
			const uptime = moment.duration(message.client.uptime).format(" D[d], H[h], m[m], s[s]");
			let dbping = async () => {
				const currentNano = process.hrtime();
				await (require("mongoose")).connection.db.command({ ping: 1 });
				const time = process.hrtime(currentNano);
				return Math.floor((time[0] * 1e9 + time[1]) * 1e-6);
			}

			const PingEmbed = new EmbedBuilder()
				.setAuthor({ name: "Pong", iconURL: client.user.displayAvatarURL() })
				.setColor(client.embedColor)
				.addFields([
					{ name: "Bot Latency", value: `\`\`\`ini\n[ ${pping}ms ]\n\`\`\``, inline: true },
					{ name: "API Latency", value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, inline: true },
					{ name: "Database Ping", value: `\`\`\`ini\n[ ${await dbping()}ms ]\n\`\`\``, inline: true },
					{ name: "Uptime", value: `\`\`\`ini\n[ ${uptime} ]\n\`\`\``, inline: true }
				])
				.setFooter({ text: `Requested by ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) })
				.setTimestamp();

			await msg.edit({
				content: `[<a:Online_Ping:1009409142387134514>] It takes longer because im Getting my Host Ping Haha`,
				embeds: [PingEmbed]
			})
		})
	},
};