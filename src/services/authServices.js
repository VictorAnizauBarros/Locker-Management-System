// Importando a biblioteca bcryptjs para criptografar e comparar senhas
const bcrypt = require("bcryptjs");

// Importando o prisma, que é uma ferramenta para interagir com o banco de dados
const prisma = require("../config/database");

// Criando uma classe AuthService para gerenciar autenticação de usuários
class AuthService {
  // Método para buscar um usuário no banco de dados pelo e-mail
  async findUserByEmail(email) {
    return prisma.users.findUnique({
      where: { email }, // Busca o usuário onde o campo 'email' é igual ao valor fornecido
    });
  }

  // Método para criar um novo usuário no banco de dados
  async createUser(nome, email, senha,rm,codigoEtec) {
    // Criptografando a senha fornecida usando bcrypt com um salt de 8 (a quantidade de iterações para gerar o hash)
    const senhaCriptografada = bcrypt.hashSync(senha, 8);

    // Criando um novo registro de usuário no banco de dados, com os dados fornecidos
    return prisma.users.create({
      data: {
        nome, // Nome do usuário
        email, // E-mail do usuário
        senha: senhaCriptografada, // Senha criptografada para segurança
        rm,
        codigoEtec
      },
    });
  }

  // Método para comparar a senha fornecida com a senha criptografada armazenada no banco de dados
  verifyPassword(senha, senhaCriptografada) {
    // Usando bcrypt para comparar a senha fornecida (senha) com a senha criptografada (senhaCriptografada)
    return bcrypt.compareSync(senha, senhaCriptografada);
  }
}

// Exportando uma instância única da classe AuthService, para ser usada em outros arquivos
module.exports = new AuthService();
