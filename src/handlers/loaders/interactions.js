const { readdirSync } = require("fs");

module.exports = async (client) => {

	client.slashCommands.clear();

	const data = [];
	readdirSync("./src/interactions").forEach((dir) => {
		const slashCommandFile = readdirSync(`./src/interactions/${dir}/`).filter((files) => files.endsWith(".js"));

		for (const file of slashCommandFile) {
			const slashCommand = require(`${process.cwd()}/src/interactions/${dir}/${file}`);

			client.slashCommands.set(slashCommand.name, slashCommand);
			console.log(`[ / ] Slash Command Loaded: ${slashCommandFile.length}`);
			data.push(slashCommand);
		}
	});

	client.on("ready", async () => {
		await client.application.commands.set(data).then(() => console.log(`[ INTERACTIONS ] Successfully Loaded All Slash Commands`)).catch((e) => console.log(e));
	})

};