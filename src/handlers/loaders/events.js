const fs = require('fs');

/**
* @param {Client} client
*/

module.exports = async (client) => {

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//                                                                                                                       //
	//                                              Events Handler                                                           //
	//                                                                                                                       //
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	fs.readdirSync('./src/events').forEach(dirs => {
		const events = fs.readdirSync(`./src/events/${dirs}`).filter(files => files.endsWith('.js'));
		console.log(`[ Events ] ${events.length} events of ${dirs} loaded`);
		for (const file of events) {
			const event = require(`${process.cwd()}/src/events/${dirs}/${file}`);
			client.on(file.split(".")[0], (...args) => event.run(client, ...args)).setMaxListeners(0);
			//client.on(file.split(".")[0], (...args) => event.run(client, ...args)).setMaxListeners(0);
		};
	});
};