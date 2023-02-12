module.exports = {
	name: "shardResume",
	run: async (client, id, replayedEvents) => {
		console.log(`[ SHARD ] Shard #${id} Resumed with ${replayedEvents} Events Replayed`);
	}
};
