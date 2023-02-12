require("dotenv").config();

module.exports = {
	token: process.env.TOKEN || "",  // your bot token
	clientID: process.env.CLIENT_ID || "1057905821561921586", // your bot client id
	prefix: process.env.PREFIX || "!", // bot prefix
	ownerID: process.env.OWNER_ID || "", //your discord id
	mongourl: process.env.MONGO_URL || "", // MongoDb URL
	colors: {
		default: "",
		success: "",
		error: ""
	},
	webhooks: {
		ready: "https://discord.com/api/webhooks/1073585676961980538/1bS1kYVp6y4jCK1_SpQgHOWI4ECJMwjf0HM0D2UTa8f8dL_YiGxjBPw0zmgTHFr48VVB",
		msgcmd: "",
		slashcmd: ""
	}
}