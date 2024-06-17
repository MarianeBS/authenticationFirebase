// Importa funções do Firebase
const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

// Objeto de configuração do Firebase contendo chaves de API e identificadores do projeto
const firebaseConfig = {
  apiKey            : process.env.FIREBASE_API_KEY,
  authDomain        : process.env.FIREBASE_AUTH_DOMAIN,
  projectId         : process.env.FIREBASE_PROJECT_ID,
  storageBucket     : process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId : process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId             : process.env.FIREBASE_APP_ID
};

// Inicializa a aplicação Firebase com a configuração especificada
const app = initializeApp(firebaseConfig);

// Inicializa o serviço de autenticação do Firebase para o aplicativo
const auth = getAuth(app);

// Exporta o serviço de autenticação para ser usado em outras partes do aplicativo
module.exports = { auth };
