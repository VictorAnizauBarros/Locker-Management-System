const { PrismaClient } = require("@prisma/client"); // Prisma Client, ferramenta para interagir com o banco de dados.
const prisma = new PrismaClient(); // Instância do Prisma Client, permitindo acessar os métodos de CRUD no banco de dados.

module.exports = prisma; // Exportação da instância do prisma para ser utilizado em outras partes do código.
