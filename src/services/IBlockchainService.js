class IBlockchainService {
  async emitirCertificado(certificadoData) { throw new Error('Not implemented'); }
  async validarCertificado(hash) { throw new Error('Not implemented'); }
  async listarCertificados() { throw new Error('Not implemented'); }
  async getStatus() { throw new Error('Not implemented'); }
  async connect() {}
  async disconnect() {}
}
module.exports = IBlockchainService;
