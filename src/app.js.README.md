## **Servidor - `src/app.js`**

### **Descrição**
O arquivo `app.js` é responsável por configurar o servidor da aplicação, incluindo a inicialização do framework **Express**, middlewares e rotas. Ele serve como a base para gerenciar as requisições HTTP e configurar o ambiente de execução da aplicação.

---

### **Principais Funcionalidades**
1. **Configuração do Servidor:** Criação de uma instância do **Express** para gerenciar o tráfego da aplicação.
2. **Middlewares Globais:** Configuração de middlewares essenciais, como:
   - Processamento de formulários.
   - Servir arquivos estáticos.
   - Gerenciamento de sessões de usuários.
3. **Rotas:** Integração com as rotas da aplicação, como autenticação e navegação.
4. **Sistema de Templates:** Configuração do motor de templates **EJS** para renderização de páginas dinâmicas.

---

### **Dependências**
- **[Express](https://expressjs.com/):** Framework minimalista para servidores web.
- **[express-session](https://www.npmjs.com/package/express-session):** Middleware para gerenciar sessões de usuários.
- **[path](https://nodejs.org/api/path.html):** Módulo nativo do Node.js para manipulação de caminhos de arquivos e diretórios.

---

### **Estrutura do Arquivo**
```javascript
const express = require("express"); 
const session = require("express-session"); 
const path = require("path"); 
const authRoutes = require('./routes/authRoutes'); 

const app = express(); 

// Configuração de middlewares globais
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, "public"))); 
app.use(session({
  secret: "supersecret", 
  resave: false, 
  saveUninitialized: true,
}));

// Configuração do sistema de templates
app.set("view engine", "ejs"); 
app.set("views", path.join(__dirname, "views")); 

// Middleware para dados globais nas views
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.query = req.query;
  next();
});

// Importação e utilização de rotas
app.use(authRoutes); 

module.exports = app; 
