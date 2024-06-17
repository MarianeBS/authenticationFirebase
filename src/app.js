const express = require('express');
const handlebars = require("express-handlebars");
const UserRouter = require('./Routers/UserRouter');
const LoginRouter = require('./Routers/LoginRouter');
const bodyParser = require('body-parser');

// Cria uma nova aplicação Express
const app = express();

// Define a porta em que o servidor irá rodar, usando a variável de ambiente PORT ou a porta 3000
const PORT = process.env.PORT || 3000;

// Configura o Express para usar o Handlebars como mecanismo de visualização
app.engine(".hbs", handlebars.engine({
  defaultLayout: "main",
  extname: ".hbs"
}));

// Define o diretório de visualizações e o mecanismo de visualização
app.set('view engine', 'hbs');

// Define o diretório de visualizações
app.set('views', `${__dirname}/Views`);

// Inicializa as classes de rotas
const routes = {
  user : new UserRouter(),
  login : new LoginRouter()
};

// Configura a aplicação para usar JSON no corpo das requisições
app.use(express.json());

// Configura a aplicação para usar URL-encoded no corpo das requisições
app.use(bodyParser.urlencoded({
  extended: true
}));

// Configura a aplicação para usar as rotas de usuários
app.use(routes.user.getRouter());

// Configura a aplicação para usar as rotas de login
app.use(routes.login.getRouter());

app.get('/home', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/', (req, res) => {
  res.render('login');
});

// Inicia o servidor na porta definida e exibe uma mensagem de confirmação
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
