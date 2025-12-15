const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path'); // 1. Importar o path
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// 👇 CORREÇÃO AQUI 👇
// __dirname é a pasta atual (src). O '../public' volta uma pasta e entra na public.
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', routes);

app.get('/', (req, res) => {
  // Redireciona para a página de emissão se acessar a raiz
  res.redirect('/emitir.html');
});

// Tratamento de Erro 404 (Rota não encontrada)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
    path: req.path
  });
});

app.use((err, req, res, next) => {
  console.error('Erro:', err);
  res.status(500).json({
    success: false,
    error: 'Erro interno',
    details: err.message
  });
});

module.exports = app;