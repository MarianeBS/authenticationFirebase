const express = require('express');
const UserController = require('../Controllers/UserController');

class UserRouter {
  /**
   * Construtor da classe que inicializa o roteador e o controlador de usuários
   */
  constructor() {
    this.router = express.Router();
    this.controller = new UserController();

    this.initializeRoutes();
  }

  /**
   * Configura as rotas de usuários, definindo os endpoints para operações CRUD
   */
  initializeRoutes() {
    this.router.post('/user/create', (req, res) => {
      this.controller.create(req, res);
    });

    this.router.get('/user/read', (req, res) => {
      this.controller.read(req, res);
    });

    this.router.put('/user/update', (req, res) => {
      this.controller.update(req, res);
    });

    this.router.delete('/user/delete', (req, res) => {
      this.controller.delete(req, res);
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

module.exports = UserRouter;
