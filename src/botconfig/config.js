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
		ready: "https://discord.com/api/webhooks/1074907642578878594/AFb0BqnvS8UU16LC8g2-5_q2GMa-101oZlnN8beNDSa3DMERXSW9BOxpAX-O-zv_vCc0",
		error: "https://discord.com/api/webhooks/1074907642578878594/AFb0BqnvS8UU16LC8g2-5_q2GMa-101oZlnN8beNDSa3DMERXSW9BOxpAX-O-zv_vCc0",
		msgcmd: "https://discord.com/api/webhooks/1074907642578878594/AFb0BqnvS8UU16LC8g2-5_q2GMa-101oZlnN8beNDSa3DMERXSW9BOxpAX-O-zv_vCc0",
		interactions: "https://discord.com/api/webhooks/1074907642578878594/AFb0BqnvS8UU16LC8g2-5_q2GMa-101oZlnN8beNDSa3DMERXSW9BOxpAX-O-zv_vCc0"
	}
}