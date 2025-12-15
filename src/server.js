const app = require('./app');
const config = require('./config');
const PORT = config.server.port;

app.listen(PORT, () => {
  console.log(`✅ Servidor: http://localhost:${PORT}`);
  console.log(`📦 Ambiente: ${config.server.env}`);
  console.log(`🔧 Provider: ${config.blockchain.provider}`);
});
