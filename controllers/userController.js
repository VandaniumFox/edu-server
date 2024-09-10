const { comparePass, hashPassword } = require("../helpers/bcrypt");
const { User } = require("../models");

class UserController {
  static async login(request, response, next) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePass(password, user.password)) {
        throw new Error("Invalid email or password");
      }

      response.status(200).json({ message: "Login success" });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.create({
        email,
        password: hashPassword(password),
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
