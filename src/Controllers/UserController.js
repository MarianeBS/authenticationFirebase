const { adminAuth } = require("../Configs/FirebaseAdminAuth");

class UserController {
  /**
   * Método responsável por criar um novo usuário com email e senha
   *
   * @param {Request} req Objeto de requisição do Express
   * @param {Response} res Objeto de resposta do Express
   */
  async create(req, res) {
    try {
      const { email, password } = req.body;

      if(!email || !password) {
        res.render('register');
      }

      const userRecord = await adminAuth.createUser({
        email,
        password
      });

      if(!userRecord) {
        res.render('register');
      }

      res.redirect('/login');
      
    } catch (error) {
      res.render('register');
    }
  }

  /**
   * Método responsável por ler os dados de um usuário específico ou listar todos os usuários
   *
   * @param {Request} req Objeto de requisição do Express
   * @param {Response} res Objeto de resposta do Express
   */
  async read(req, res) {
    try {
      const { uid } = req.body;

      if (uid) {
        const userRecord = await adminAuth.getUser(uid);

        res.status(200).send({
          uid   : userRecord.uid,
          email : userRecord.email,
        });
      } else {
        const listUsersResult = await adminAuth.listUsers();

        const users = listUsersResult.users.map(userRecord => ({
          uid   : userRecord.uid,
          email : userRecord.email,
        }));

        res.status(200).send(users);
      }
    } catch (error) {
      res.status(404).send(`Erro ao buscar usuário(s): ${error.message}`);
    }
  }

  /**
   * Método responsável por atualizar os dados de um usuário específico
   *
   * @param {Request} req Objeto de requisição do Express
   * @param {Response} res Objeto de resposta do Express
   */
  async update(req, res) {
    try {
      const { uid, email, password } = req.body;
      const userRecord = await adminAuth.updateUser(uid, {
        email,
        password,
      });

      res.status(200).send(`Usuário atualizado com sucesso: ${userRecord.uid}`);
    } catch (error) {
      res.status(400).send(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  /**
   * Método responsável por deletar um usuário específico
   *
   * @param {Request} req Objeto de requisição do Express
   * @param {Response} res Objeto de resposta do Express
   */
  async delete(req, res) {
    try {
      const { uid } = req.body;

      await adminAuth.deleteUser(uid);

      res.status(200).send(`Usuário deletado com sucesso: ${uid}`);
    } catch (error) {
      res.status(400).send(`Erro ao deletar usuário: ${error.message}`);
    }
  }
}

module.exports = UserController;
