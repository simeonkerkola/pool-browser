// eslint-disable-next-line no-undef
module.exports = {
  client: {
    service: {
      name: 'balancer-v2',
      // URL to the GraphQL API
      url: ' https://api.thegraph.com/subgraphs/name/balancer-labs/balancer-v2',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
  },
};
