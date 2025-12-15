const Joi = require('joi');

const certificadoSchema = Joi.object({
  nome: Joi.string().min(3).max(100).required()
    .messages({
      'string.empty': 'Nome é obrigatório',
      'string.min': 'Nome deve ter no mínimo 3 caracteres'
    }),
  cpf: Joi.string().pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required()
    .messages({
      'string.pattern.base': 'CPF deve estar no formato XXX.XXX.XXX-XX'
    }),
  email: Joi.string().email().required()
    .messages({ 'string.email': 'Email inválido' }),
  curso: Joi.string().min(3).max(200).required(),
  cargaHoraria: Joi.number().integer().min(1).max(9999).required(),
  coordenacao: Joi.string().min(2).max(100).required()
});

const validacaoSchema = Joi.object({
  hash: Joi.string().length(64).pattern(/^[a-f0-9]+$/).required()
    .messages({
      'string.length': 'Hash deve ter 64 caracteres',
      'string.pattern.base': 'Hash inválido'
    })
});

function validateCertificado(data) {
  return certificadoSchema.validate(data, { abortEarly: false });
}

function validateHash(data) {
  return validacaoSchema.validate(data, { abortEarly: false });
}

module.exports = { validateCertificado, validateHash };
