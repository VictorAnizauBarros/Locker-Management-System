const bcrypt = require("bcryptjs");
const prisma = require("../config/database");

class AuthService {
  async findUserByEmail(email) {
    return prisma.users.findUnique({
      where: { email },
    });
  }

  async createUser(nome, email, senha) {
    const senhaCriptografada = bcrypt.hashSync(senha, 8);
    return prisma.users.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada,
      },
    });
  }
  verifyPassword(senha, senhaCriptografada) {
    return bcrypt.compareSync(senha, senhaCriptografada);
  }
}

module.exports = new AuthService();
