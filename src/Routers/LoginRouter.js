const express = require('express');
const LoginController = require('../Controllers/LoginController');

class LoginRouter {
  /**
   * Construtor da classe que inicializa o roteador e o controlador de login
   */
  constructor() {
    this.router          = express.Router();
    this.loginController = new LoginController();

    this.setupRoutes();
  }

  /**
   * Configura as rotas de login, definindo o endpoint para a operação de login
   */
  setupRoutes() {
    this.router.post('/login', (req, res) => {
      this.loginController.login(req, res);
    });

    this.router.get('/login', (req, res) => {
      res.render('login');
    });
  }

  /**
   * Método que retorna o roteador configurado para ser utilizado em outras partes do aplicativo
   *
   * @returns {Router} O roteador configurado do Express
   */
  getRouter() {
    return this.router;
  }
}

module.exports = LoginRouter;
