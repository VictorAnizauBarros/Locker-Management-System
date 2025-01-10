const express = require("express"); // Framework express para criar o servidor.
const session = require("express-session"); // Middleware para gerenciar sessões dos usuários. 
const path = require("path"); // Módulo para manipulação de caminhos de arquivos e diretórios.
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação dos usuários.
const lockersRoutes = require('./routes/lockersRoutes'); 

const app = express(); // Instância do aplicativo express

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); // Middleware para processar dados de formulários URL-encoded (método POST)
app.use(express.static("src/public")); // Serve arquivos estáticos do diretório "public".
app.use(
  session({
    secret: "supersecret", // Define uma chave secreta para assinar a sessão e garantir a segurança.
    resave: false, // Impede que a sessão seja regravada em cada requisição, caso não haja alterações.   
    saveUninitialized: true, // Garante que sessões não inicializadas sejam salvas. 
  })
);

app.set("view engine", "ejs"); // Define o motor de visualização de templates como arquivos EJS. 
app.set("views", path.join(__dirname, "views")); // Define o diretório onde as views EJS serão localizadas.  

// Middleware para disponibilizar a sessão e os parâmetros de consulta globalmente nas views.
app.use((req, res, next) => {
  res.locals.session = req.session; // Torna a sessão disponível globalmente nas views.
  res.locals.query = req.query; // Torna os parâmetros de consulta da URL disponíveis nas views.
  next(); // Passa a requisição para o próximo middleware ou rota.
});

//rotas 
app.use(authRoutes); // Utiliza as rotas de autenticação.
app.use(lockersRoutes); // Utiliza as rotas de armários.

module.exports = app; //Exporta a instância do Express para ser utilizada em outros arquivos. 