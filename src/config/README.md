
## **Configuração do Prisma - `src/config/database.js`**

### **Descrição**
O arquivo `database.js` configura o **Prisma**, uma ferramenta ORM (Object-Relational Mapping) que facilita a interação da aplicação com o banco de dados. Ele cria e exporta uma instância do `PrismaClient` para ser utilizada em outras partes do sistema.

---

### **Principais Funcionalidades**
1. **Instanciação do PrismaClient:**  
   - Permite executar operações no banco de dados como buscar, criar, atualizar ou deletar registros.
2. **Exportação Centralizada:**  
   - Disponibiliza uma única instância do Prisma para ser reutilizada em toda a aplicação, otimizando a conexão com o banco de dados.

---

### **Dependências**
- **[Prisma](https://www.prisma.io/):** ORM que simplifica o gerenciamento de bancos de dados, gerando consultas baseadas em um esquema central (`schema.prisma`).

---

### **Estrutura do Arquivo**
```javascript
const { PrismaClient } = require('@prisma/client'); // Importa o PrismaClient
const prisma = new PrismaClient(); // Instancia o PrismaClient

module.exports = prisma; // Exporta a instância para uso em outros módulos
