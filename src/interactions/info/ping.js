const { MessageEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
	name: "ping",
	description: "Shows Bot ping in WS",
	type: 'CHAT_INPUT',
	category: "Information",
	/**
	 *
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, interaction, args) => {

		await interaction.editReply({ content: "Pinging..." }).then(async () => {

			const ping = Date.now() - interaction.createdAt;
			const api_ping = client.ws.ping;
			const uptime = moment.duration(interaction.client.uptime).format(" D[d], H[h], m[m], s[s]");
			/*
			let dbping = async () => {
			  const currentNano = process.hrtime();
			  await (require("mongoose")).connection.db.command({ ping: 1 });
			  const time = process.hrtime(currentNano);
			  return Math.floor((time[0] * 1e9 + time[1]) * 1e-6);
};
*/


			const PingEmbed = new MessageEmbed()
				.setAuthor({ name: "Pong", iconURL: client.user.displayAvatarURL() })
				.setColor(client.embedColor)
				.addFields([
					{ name: "Bot Latency", value: `\`\`\`ini\n[ ${ping}ms ]\n\`\`\``, inline: true },
					{ name: "API Latency", value: `\`\`\`ini\n[ ${api_ping}ms ]\n\`\`\``, inline: true },
					//  { name: "Database Ping", value: `\`\`\`ini\n[ ${await dbping()}ms ]\n\`\`\``, inline: true },
					{ name: "Uptime", value: `\`\`\`ini\n[ ${uptime} ]\n\`\`\``, inline: true }
				])
				.setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.avatarURL({ dynamic: true }) })
				.setTimestamp();

			await interaction.editReply({
				content: "Pong!",
				embeds: [PingEmbed]
			});
		})
	},
}
