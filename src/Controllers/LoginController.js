const { auth } = require('../Configs/FirebaseClientAuth');
const { signInWithEmailAndPassword } = require('firebase/auth');

class LoginController {
  /**
   * Método responsável por realizar a autenticação de um usuário com email e senha
   *
   * @param {Request} req Objeto de requisição do Express
   * @param {Response} res Objeto de resposta do Express
  */
  async login(req, res) {
    try {
      const { email, password } = req.body;

      console.log(email, password)

      if (!email || !password) {
        res.render('login');

        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      if(!token) {
        res.render('login');
      }

      res.cookie('token', token);
      res.redirect('/home');
    } catch (error) {
      res.render('login');
    }
  }
}

module.exports = LoginController;
