const BlockchainFactory = require('../services/blockchainFactory');
const { validateCertificado, validateHash } = require('../validators/certificadoValidator');

let blockchainService = null;
async function getBlockchainService() {
  if (!blockchainService) {
    blockchainService = BlockchainFactory.create();
    await blockchainService.connect();
  }
  return blockchainService;
}

async function emitirCertificado(req, res) {
  try {
    const { error, value } = validateCertificado(req.body);
    if (error) return res.status(400).json({ success: false, error: 'Dados inválidos', details: error.details });
    const service = await getBlockchainService();
    const result = await service.emitirCertificado(value);
    if (!result.success) return res.status(500).json({ success: false, error: result.error });
    return res.status(201).json({ success: true, message: 'Emitido com sucesso', data: result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function validarCertificado(req, res) {
  try {
    const { hash } = req.params;
    const { error } = validateHash({ hash });
    if (error) return res.status(400).json({ success: false, error: 'Hash inválido' });
    const service = await getBlockchainService();
    const result = await service.validarCertificado(hash);
    if (!result.success) return res.status(500).json({ success: false, error: result.error });
    if (!result.found) return res.status(404).json(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function listarCertificados(req, res) {
  try {
    const service = await getBlockchainService();
    const certificados = await service.listarCertificados();
    return res.status(200).json({ success: true, count: certificados.length, data: certificados });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

async function getStatus(req, res) {
  try {
    const service = await getBlockchainService();
    const status = await service.getStatus();
    return res.status(200).json({ success: true, data: status });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { emitirCertificado, validarCertificado, listarCertificados, getStatus };
