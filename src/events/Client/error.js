module.exports = {
	name: "error",
	run: async (client, error) => {
		console.log(String(error));
	}
};