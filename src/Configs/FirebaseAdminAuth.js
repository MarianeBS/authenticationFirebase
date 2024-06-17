// Carrega as variáveis de ambiente de um arquivo .env na raiz do projeto
require('dotenv').config();

// Importa funções de administração do Firebase
const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');

// Carrega as credenciais de serviço a partir de um arquivo especificado na variável de ambiente
const serviceAccount = require(process.env.FIREBASE_SDK_ADMIN);

// Inicializa a aplicação Firebase Admin com as credenciais de serviço
const app = initializeApp({
  credential: cert(serviceAccount)
});

// Inicializa o serviço de autenticação do administrador do Firebase para o aplicativo
const adminAuth = getAuth(app);

// Exporta o serviço de autenticação do administrador e a aplicação para serem usados em outras partes do aplicativo
module.exports = { adminAuth, app };
