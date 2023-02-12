module.exports = {
	name: "shardReconnecting",
	run: async (client, id) => {
		console.log(`[ SHARD ] Shard #${id} Reconnecting`);
	}
};