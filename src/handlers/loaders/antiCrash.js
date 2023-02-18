const { WebhookClient } = require("discord.js");

module.exports = async (client) => {
	let web = new WebhookClient({ url: client.config.webhooks.error })

	process.on('unhandledRejection', (error) => {
		web.send(`\`\`\`js\n${error.stack}\`\`\``)
	});
	process.on("uncaughtException", (err, origin) => {
		web.send(`\`\`\`js\n${err.stack}\`\`\``)
	});
	process.on('uncaughtExceptionMonitor', (err, origin) => {
		web.send(`\`\`\`js\n${err.stack}\`\`\``)
	});
	process.on('beforeExit', (code) => {
		web.send(`\`\`\`js\n${code}\`\`\``)
	});
	process.on('exit', (code) => {
		web.send(`\`\`\`js\n${code}\`\`\``)
	});
};