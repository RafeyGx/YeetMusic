const { WebhookClient } = require("discord.js");

module.exports = async (client) => {

	//const errChannel = new WebhookClient({ url: '' });

	process.on('beforeExit', (code) => {
		console.error('=== [antiCrash] | [beforeExit] | [start] ===');
		console.error(code);
		console.error('=== [antiCrash] | [beforeExit] | [end] ===');
	});
	process.on('exit', (error) => {
		console.error('=== [antiCrash] | [exit] | [start] ===');
		console.error(error);
		console.error('=== [antiCrash] | [exit] | [end] ===');
	});
	// process.on('multipleResolves', (type, promise, reason) => {
	// console.error('=== [antiCrash] | [multipleResolves] | [start] ===');
	// console.error(type, promise, reason);
	// console.error('=== [antiCrash] | [multipleResolves] | [end] ===');
	// });
	process.on('unhandledRejection', (reason, promise) => {
		console.error('=== [antiCrash] | [unhandledRejection] | [start] ===');
		console.error(reason, promise);
		console.error('=== [antiCrash] | [unhandledRejection] | [end] ===');
	});
	process.on('rejectionHandled', (promise) => {
		console.error('=== [antiCrash] | [rejectionHandled] | [start] ===');
		console.error(promise);
		console.error('=== [antiCrash] | [rejectionHandled] | [end] ===');
	})
	process.on("uncaughtException", (err, origin) => {
		console.error('=== [antiCrash] | [uncaughtException] | [start] ===');
		console.error(err);
		console.error('=== [antiCrash] | [uncaughtException] | [end] ===');
	});
	process.on('uncaughtExceptionMonitor', (err, origin) => {
		console.error('=== [antiCrash] | [uncaughtExceptionMonitor] | [start] ===');
		console.error(err, origin);
		console.error('=== [antiCrash] | [uncaughtExceptionMonitor] | [end] ===');
	});
	process.on('warning', (warning) => {
		console.error('=== [antiCrash] | [warning] | [start] ===');
		console.error(warning);
		console.error('=== [antiCrash] | [warning] | [end] ===');
	});
	process.on('SIGINT', () => {
		console.error('=== [antiCrash] | [SIGINT] ===');
	});

	console.log(`[ READY ] Started AntiCrash Services.`);
};