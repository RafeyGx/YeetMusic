const { Client } = require("discord.js");
const fs = require("fs");

/**
 * @param {Client} client 
 */

module.exports = async (client) => {

	let count = 0;
	fs.readdirSync("./src/commands/").forEach(dir => {
		const commandFiles = fs.readdirSync(`${process.cwd()}/src/commands/${dir}/`).filter(files => files.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`${process.cwd()}/src/commands/${dir}/${file}`);
			if (command.name) {
				client.commands.set(command.name, command);

				if (command.aliases && Array.isArray(command.aliases)) command.aliases.forEach((alias) => client.aliases.set(alias, command.name));

				count++;
			}
		}
	});
	console.log(`[ READY ] Commands Loaded ${count}`);
}