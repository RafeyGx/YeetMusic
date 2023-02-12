module.exports = {
	name: "rateLimit",
	run: async (client, rateLimitData) => {
		console.log(JSON.stringify(rateLimitData));
	}
};