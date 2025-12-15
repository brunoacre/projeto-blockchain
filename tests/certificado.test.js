const request = require('supertest');
const app = require('../src/app');

describe('API de Certificados', () => {
  test('GET /api/health - deve retornar ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /api/certificados/emitir - deve emitir certificado', async () => {
    const certificado = {
      nome: 'João Silva', cpf: '123.456.789-00', email: 'joao@example.com',
      curso: 'Blockchain', cargaHoraria: 40, coordenacao: 'TI'
    };
    const res = await request(app).post('/api/certificados/emitir').send(certificado);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
