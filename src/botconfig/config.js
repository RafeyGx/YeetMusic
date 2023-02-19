require("dotenv").config();

module.exports = {
	token: process.env.TOKEN || "",  // your bot token
	clientID: process.env.CLIENT_ID || "1057905821561921586", // your bot client id
	prefix: process.env.PREFIX || "!", // bot prefix
	ownerID: process.env.OWNER_ID || "757184358871203850", //your discord id
	mongourl: process.env.MONGO_URL || "", // MongoDb URL
	colors: {
		default: "#8bd0dd",
		success: "#ABF4AE",
		error: "#b34f5a"
	},
	webhooks: {
		ready: process.env.webhook || "",
		error: process.env.webhook || "",
		msgcmd: process.env.webhook || "",
		interactions: process.env.webhook || ""
	}
}