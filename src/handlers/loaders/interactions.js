const { readdirSync } = require("fs");

module.exports = async (client) => {
	const data = [];
	readdirSync("./src/interactions").forEach((dir) => {
		const slashCommandFile = readdirSync(`./src/interactions/${dir}/`).filter((files) => files.endsWith(".js"));

		for (const file of slashCommandFile) {
			const slashCommand = require(`${process.cwd()}/src/interactions/${dir}/${file}`);

			if (!slashCommand.name) return console.error(`slashCommandNameError: ${slashCommand.split(".")[0]} application command name is required.`);

			if (!slashCommand.description) return console.error(`slashCommandDescriptionError: ${slashCommand.split(".")[0]} application command description is required.`);

			client.slashCommands.set(slashCommand.name, slashCommand);
			console.log(`[ / ] Slash Command Loaded: ${slashCommand.length}`);
			data.push(slashCommand);
		}
	});
	client.on("ready", async () => {

		await client.application.commands.set(data).then(() => console.log(`Successfully Loaded All Slash Commands`)).catch((e) => console.log(e));
	});
};