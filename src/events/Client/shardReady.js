
module.exports = {
	name: "shardReady",
	run: async (client, id) => {
		console.log(`[ SHARD ] Shard #${id} Ready`);
	}
};
