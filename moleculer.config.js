module.exports = {
  registry: {
    strategy: 'Shard',
    strategyOptions: {
      shardKey: '#id',
    },
    cacher: true,
  },
};
