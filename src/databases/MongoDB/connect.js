const mongoose = require('mongoose');

async function connect() {
	mongoose.set('strictQuery', false);
	try {

		const config = require(`${process.cwd()}/src/botconfig/config.js`)

		console.log(`[ Database ] MongoDB is connecting...`)
		await mongoose.connect(config.mongourl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
	} catch (err) {
		console.log(`[ Database ] MongoDB Failed to connect to MongoDB!`)
		console.log(`[ Database ] Error: ${err}`)
		console.log("[ Database ] Exiting...")
		process.exit(1)
	}


	mongoose.connection.once("open", () => {
		console.log(`[ Database ] MongoDB is ready!`);
	});

	mongoose.connection.on("error", (err) => {
		console.log(`[ Database ] Failed to connect to MongoDB!`)
		console.log(`[ Database ] Error: ${err}`)
		console.log("[ Database ] Exiting...")
		process.exit(1)
	});
	return;
}

module.exports = connect