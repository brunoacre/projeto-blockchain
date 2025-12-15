# Blockchain Certificados - Sistema de Emissão e Validação

> **Status:** Em Desenvolvimento (Fase de Mock/Simulação) | **Versão:** 0.0.1

Este projeto é uma aplicação Fullstack (Backend Node.js + Frontend HTML/JS) para a **emissão e validação de certificados acadêmicos**, utilizando conceitos fundamentais de Blockchain para garantir a autenticidade e integridade dos documentos.

O sistema opera atualmente com um **Mock Blockchain** (Ledger simulada em arquivo), mas foi arquitetado utilizando **Design Patterns** que permitem a migração transparente para redes reais (como Hyperledger Besu ou Fabric) sem alterar a interface do usuário ou as regras de negócio.

---

## Funcionalidades

- **Emissão de Certificados:** Registro de documentos com nome, CPF, curso e carga horária.
- **Hashing Criptográfico:** Cada certificado gera um hash único (SHA-256).
- **Encadeamento de Blocos:** Cada novo registro contém o hash do registro anterior, criando uma cadeia imutável.
- **Validação Pública:** Qualquer pessoa com o hash do certificado pode verificar sua autenticidade.
- **Detecção de Fraude:** O sistema detecta automaticamente se um registro foi alterado manualmente no banco de dados.

---

## Tecnologias Utilizadas

- **Backend:** Node.js, Express
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Segurança:** Módulo Crypto (SHA-256)
- **Validação:** Joi (Schema Validation)
- **Testes:** Jest, Supertest
- **Arquitetura:** MVC, Factory Pattern, Dependency Injection

---

## Arquitetura e O "Mock Blockchain"

Para facilitar o desenvolvimento inicial e a validação acadêmica sem a complexidade de infraestrutura de rede, implementamos um **MockBlockchainService**.

### Como funciona a Simulação?
O sistema utiliza um arquivo JSON local (`data/blockchain.json`) como Livro-razão (Ledger). Apesar de simples, ele respeita os princípios de segurança da blockchain:

1.  **Imutabilidade Lógica:** O hash de um bloco é calculado com base em seu conteúdo + o hash do bloco anterior.
2.  **Quebra de Cadeia:** Se um dado for alterado manualmente no arquivo JSON, o hash recalculado não baterá com o hash registrado, invalidando o certificado e todos os blocos subsequentes.

### Padrão Factory (Preparado para o Futuro)
O projeto utiliza uma Interface (`IBlockchainService`). O *Controller* da API não sabe se está gravando em um arquivo JSON ou em uma rede Ethereum.

```javascript
// src/services/blockchainFactory.js
// A troca de tecnologia é feita apenas mudando uma configuração no .env
switch (provider) {
  case 'mock': return new MockBlockchainService();
  case 'besu': return new BesuBlockchainService();   // Implementação futura
  case 'fabric': return new FabricBlockchainService(); // Implementação futura
}
```
-------------------------------------------------------------------------------------------------------------------------------------------------------------

Instalação e Execução
Pré-requisitos
- Node.js (v18 ou superior)
- NPM

Passo a Passo
Clone o repositório: git clone ...
Acesse a pasta: cd ...
Instale as dependências: npm install

Inicie o servidor: npm run dev
Acesse no navegador:
- Emitir: http://localhost:3000/emitir.html
- Validar: http://localhost:3000/validar.html

----------------------------------------------------------------------------------------------------------------------------------------
Como Testar
1. Teste de Fluxo Normal
- Acesse a página de emissão.
- Preencha os dados (CPF deve ter pontuação: 000.000.000-00).
- Clique em "Registrar".
- Copie o Hash gerado (ex: aa4a08...).
- Vá para a página de validação, cole o hash e veja o resultado VERDE (Válido).

2. Teste de Tentativa de Fraude ("Hack")
- Este teste demonstra a segurança da cadeia:
- Abra o arquivo do banco de dados no seu editor de código: data/blockchain.json.
- Encontre o bloco do certificado que você acabou de criar (geralmente o último).
- Altere manualmente algum dado (ex: mude a cargaHoraria de 40 para 100).
- Salve o arquivo JSON.
- Volte à página de validação no navegador e tente verificar o mesmo hash.
- Resultado: O sistema exibirá uma mensagem VERMELHA de erro/fraude, pois o hash do conteúdo não corresponde mais ao hash assinado no bloco.

----------------------------------------------------------------------------------------------------------------------------------------
Próximos Passos
- A estrutura atual serve como base sólida para pesquisas avançadas. As próximas etapas de desenvolvimento incluem:
- Integração Hyperledger Besu:
- Substituir o Mock por Smart Contracts em Solidity.
- Testar consenso IBFT 2.0 em rede privada.
- Integração Hyperledger Fabric:
- Implementar Chaincodes para lógica de negócio.
- Utilizar canais privados para proteção de dados sensíveis.
- Identidade Digital:
- Adequar o modelo de dados ao padrão W3C Verifiable Credentials.

----------------------------------------------------------------------------------------------------------------------------------------
Estrutura do Projeto

<img width="641" height="250" alt="image" src="https://github.com/user-attachments/assets/340893b8-26bc-4887-9e17-60fce9fb3943" />

---------------------------------------------------------------------------------------------------------------------------------------------
Licença
Este projeto é open-source e está sob a licença MIT. Desenvolvido para fins acadêmicos e de pesquisa.
