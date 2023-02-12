module.exports = {
	name: "shardError",
	run: async (client, error, id) => {
		console.log(`[ SHARD ] Shard #${id} Errored`);
		console.log(`[ SHARD ] Error: ${error}`);
	}
};