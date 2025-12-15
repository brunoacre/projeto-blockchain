const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const IBlockchainService = require('./IBlockchainService');
const { generateBlockHash, validateBlockHash } = require('../utils/hash');
const config = require('../config');

class MockBlockchainService extends IBlockchainService {
  constructor() {
    super();
    this.dataPath = path.resolve(config.blockchain.mock.dataPath);
    this.initialized = false;
  }

  async connect() {
    try {
      const dir = path.dirname(this.dataPath);
      await fs.mkdir(dir, { recursive: true });
      try {
        await fs.access(this.dataPath);
        const data = await this._readData();
        if (!data.blocks || !Array.isArray(data.blocks)) throw new Error('Estrutura inválida');
      } catch (error) {
        await this._createGenesisBlock();
      }
      this.initialized = true;
      console.log('✅ Mock Blockchain inicializado');
    } catch (error) {
      console.error('❌ Erro ao inicializar:', error);
      throw error;
    }
  }

  async _createGenesisBlock() {
    const genesisBlock = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      previousHash: '0',
      data: { message: 'Genesis Block - Blockchain de Certificados' }
    };
    genesisBlock.hash = generateBlockHash(genesisBlock);
    const initialData = {
      blocks: [genesisBlock],
      metadata: { created: new Date().toISOString(), version: '1.0.0', provider: 'mock' }
    };
    await fs.writeFile(this.dataPath, JSON.stringify(initialData, null, 2));
  }

  async _readData() {
    const content = await fs.readFile(this.dataPath, 'utf-8');
    return JSON.parse(content);
  }

  async _writeData(data) {
    await fs.writeFile(this.dataPath, JSON.stringify(data, null, 2));
  }

  async _getLastBlock() {
    const data = await this._readData();
    return data.blocks[data.blocks.length - 1];
  }

  async emitirCertificado(certificadoData) {
    try {
      if (!this.initialized) await this.connect();
      const data = await this._readData();
      const lastBlock = await this._getLastBlock();
      const newBlock = {
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        previousHash: lastBlock.hash,
        data: { tipo: 'certificado', ...certificadoData, dataEmissao: new Date().toISOString() }
      };
      newBlock.hash = generateBlockHash(newBlock);
      data.blocks.push(newBlock);
      await this._writeData(data);
      console.log(`📝 Certificado emitido: ${newBlock.hash.substring(0, 16)}...`);
      return { success: true, transactionId: newBlock.id, hash: newBlock.hash, block: newBlock };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async validarCertificado(hash) {
    try {
      if (!this.initialized) await this.connect();
      const data = await this._readData();
      const block = data.blocks.find(b => b.hash === hash);
      if (!block) return { success: true, found: false, message: 'Certificado não encontrado' };
      
      const isValid = validateBlockHash(block);
      const blockIndex = data.blocks.findIndex(b => b.hash === hash);
      let chainValid = true;
      if (blockIndex > 0) {
        const previousBlock = data.blocks[blockIndex - 1];
        chainValid = block.previousHash === previousBlock.hash;
      }
      return {
        success: true, found: true, valid: isValid && chainValid,
        certificado: block.data, block: block,
        validation: { hashValid: isValid, chainValid: chainValid }
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async listarCertificados() {
    if (!this.initialized) await this.connect();
    const data = await this._readData();
    return data.blocks.filter(b => b.data.tipo === 'certificado')
      .map(b => ({ hash: b.hash, timestamp: b.timestamp, certificado: b.data }));
  }

  async getStatus() {
    if (!this.initialized) await this.connect();
    const data = await this._readData();
    return {
      provider: 'mock', status: 'connected',
      blocksCount: data.blocks.length,
      certificadosCount: data.blocks.filter(b => b.data.tipo === 'certificado').length
    };
  }
}

module.exports = MockBlockchainService;
