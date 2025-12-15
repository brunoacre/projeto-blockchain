const crypto = require('crypto');

function generateHash(data) {
  const dataString = JSON.stringify(data);
  return crypto.createHash('sha256').update(dataString).digest('hex');
}

function generateBlockHash(block) {
  const blockData = {
    timestamp: block.timestamp,
    previousHash: block.previousHash,
    data: block.data
  };
  return generateHash(blockData);
}

function validateBlockHash(block) {
  const calculatedHash = generateBlockHash(block);
  return calculatedHash === block.hash;
}

module.exports = {
  generateHash,
  generateBlockHash,
  validateBlockHash
};
