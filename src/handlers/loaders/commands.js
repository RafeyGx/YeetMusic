const { readdirSync } = require('fs');

module.exports = (client) => {
	let count = 0;
	readdirSync("./src/commands/").forEach(dir => {
		const commandFiles = readdirSync(`${process.cwd()}/src/commands/${dir}/`).filter(f => f.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`${process.cwd()}/src/commands/${dir}/${file}`);
			if (command.name) {
				client.commands.set(command.name, command);
				if (command.aliases && Array.isArray(command.aliases)) {
					command.aliases.forEach(alias => {
						client.aliases.set(alias, command.name)
					})
				}
				count++;
			}
		}
	});
	console.log(`[ COMMANDS ] Client Commands Loaded ${count}`);
}