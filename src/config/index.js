require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  blockchain: {
    provider: process.env.BLOCKCHAIN_PROVIDER || 'mock',
    mock: {
      dataPath: process.env.MOCK_DATA_PATH || './data/blockchain.json'
    },
    besu: {
      rpcUrl: process.env.BESU_RPC_URL,
      networkId: process.env.BESU_NETWORK_ID,
      contractAddress: process.env.BESU_CONTRACT_ADDRESS,
      privateKey: process.env.BESU_PRIVATE_KEY
    }
  }
};
