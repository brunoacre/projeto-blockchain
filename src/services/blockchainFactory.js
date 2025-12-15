const config = require('../config');
const MockBlockchainService = require('./MockBlockchainService');

class BlockchainFactory {
  static create() {
    const provider = config.blockchain.provider;
    switch (provider) {
      case 'mock': return new MockBlockchainService();
      case 'besu': throw new Error('Besu provider ainda não implementado');
      case 'fabric': throw new Error('Fabric provider ainda não implementado');
      default:
        console.warn(`⚠️  Provider "${provider}" desconhecido. Usando mock.`);
        return new MockBlockchainService();
    }
  }
}
module.exports = BlockchainFactory;
