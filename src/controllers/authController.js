// Importação do serviço de autenticação para utilização das funções definidas no arquivo "authServices".
const authServices = require("../services/authServices");

exports.getHome = (req, res) => {
  try {
    // Verifica se o usuário está autenticado
    if (req.session.userId) {
      // Se o usuário estiver logado, redireciona para a página de registro ou qualquer página relevante
      return res.redirect('/lockers');
    }
    
    // Caso o usuário não esteja autenticado, renderiza a página inicial com opções de login e registro
    res.render("main", { 
      title: "Bem-vindo", 
      body: "content/home" 
    });
  } catch (error) {
    // Caso ocorra algum erro, exibe no console
    console.log(error);
  }
};

// Função para renderizar a página de login
exports.getLogin = (req, res) => {
    if(req.session.userId){
        return res.redirect('/lockers');
    }
  try {
    // Renderiza a página 'main' passando os dados necessários para a view: título "Login" e conteúdo do corpo "content/login"
    res.render("main", { title: "Login", body: "content/login" });
  } catch (error) {
    // Caso ocorra algum erro, ele será exibido no console
    console.log(error);
  }
};

// Função que é chamada ao submeter o formulário de login (POST)
exports.postLogin = async (req, res) => {
  // Desestruturação dos dados recebidos do corpo da requisição (email e senha)
  const { email, senha } = req.body;
  
  try {
    // Chama o serviço para procurar o usuário com o email fornecido
    const user = await authServices.findUserByEmail(email);
    
    // Se o usuário for encontrado e a senha fornecida for válida
    if (user && authServices.verifyPassword(senha, user.senha)) {
      // Armazena os dados do usuário na sessão (userId e userEmail)
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      // Redireciona o usuário para a página de registro ("/register")
      res.redirect("/lockers");
    } else {
      // Se as credenciais estiverem incorretas, loga a mensagem de erro e redireciona para a página de login com erro
      console.log({message: "Invalid email or password" });
      res.redirect("/login?error=invalid");
    }
  } catch (error) {
    // Caso ocorra um erro durante o processo de login, redireciona para o login com erro de servidor
    res.redirect("/login?error=server");
    console.error("Erro ao fazer login:", error);
  }
};

// Função para renderizar a página de registro
exports.getRegister = (req, res) => {
  try {
    // Renderiza a página 'main' passando os dados necessários para a view: título "Registrar-se" e conteúdo do corpo "content/register"
    res.render("main", { title: "Registrar-se", body: "content/register" });
  } catch (error) {
    // Caso ocorra algum erro, ele será exibido no console
    console.log(error);
  }
};

// Função que é chamada ao submeter o formulário de registro (POST)
exports.postRegister = async (req, res) => {
  // Desestruturação dos dados recebidos do corpo da requisição (nome, email, senha)
  const { nome, email, senha, rm, codigoEtec } = req.body;
  
  try {
    // Verifica se já existe um usuário com o mesmo email no banco de dados
    const existingUser = await authServices.findUserByEmail(email);
    if (existingUser) {
      // Se já existir, redireciona para a página de registro com a mensagem de erro "username_exists"
      return res.redirect("/register?error=username_exists");
    }
    
    // Caso o email não exista, cria um novo usuário com as informações fornecidas
    await authServices.createUser(nome, email, senha);
    
    // Após criar o usuário, redireciona para a página de login
    res.redirect("/login");
  } catch (error) {
    // Se ocorrer algum erro durante o processo de registro, ele será logado no console
    console.error("Erro ao criar usuario:", error);
  }
};

// Função para efetuar o logout (sair do sistema)
exports.logout = (req, res) => {
  // Destrói a sessão do usuário, removendo todas as informações armazenadas nela
  req.session.destroy();
  
  // Redireciona o usuário para a página de login após o logout
  res.redirect("/login");
};
