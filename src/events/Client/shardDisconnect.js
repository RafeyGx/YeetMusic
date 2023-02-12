module.exports = {
	name: "shardDisconnect",
	run: async (id) => {
		console.log(`[ SHARD ] Shard #${id} Disconnected`);
	}
};
