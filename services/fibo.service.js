export default {
  name: 'fibo',
  $noServiceNamePrefix: true,
  metadata: {
    n: 0,
  },
  actions: {
    getFibo: {
      cache: {
        keys: ['#n'],
      },
      async handler(ctx) {
        ctx.metadata.n += 1;
        const { n } = ctx.metadata;
        for (let i = 0; i <= n; i += 1) {
          if (i <= 1) this.cacheFibo(n, i);
          // eslint-disable-next-line no-await-in-loop
          else this.cacheFibo(i, await this.getNextFibo(i));
        }
        return this.getCachedFibo(n);
      },
    },
    clearFibo(ctx) {
      ctx.metadata.n = 0;
    },
  },
  methods: {
    cacheFibo(n, fib) {
      this.broker.cacher.set(`fibo.getFibo:${n}`, { [n]: fib });
    },
    async getCachedFibo(n) {
      return this.broker.cacher.get(`fibo.getFibo:${n}`);
    },
    async getNextFibo(n) {
      return Promise.all([this.getCachedFibo(n - 2), this.getCachedFibo(n - 1)])
        .then(([n1, n2]) => n1 + n2);
    },
  },
  created() {
    this.metadata.id = this.broker.instanceID; // nodeID
  },
};
