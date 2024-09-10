const { comparePassword } = require("../helpers/bcrypt");
const { User } = require("../models");

class UserController {
  static async login(request, response, next) {
    try {
      const { email, password } = request.body;

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePassword(password, user.password)) {
        throw new Error("Invalid email or password");
      }

      response.status(200).json({ message: "Login success" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
