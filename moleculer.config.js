export default {
  registry: {
    strategy: 'Shard',
    strategyOptions: {
      shardKey: '#id',
    },
    cacher: true,
  },
};
