
const authServices = require("../services/authServices");

exports.getLogin = (req, res) => {
  try {
    res.render("main", { title: "Login", body: "content/login" });
  } catch (error) {
    console.log(error);
  }
};

exports.postLogin = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const user = await authServices.findUserByEmail(email);
    if (user && authServices.verifyPassword(senha, user.senha)) {
      req.session.userId = user.id;
      req.session.userEmail = user.email;
      res.redirect("/register");
    } else {
    console.log({message: "Invalid email or password" });
      res.redirect("/login?error=invalid");
    }
  } catch (error) {
    res.redirect("/login?error=server");
    console.error("Erro ao fazer login:", error);
  }
};

exports.getRegister = (req, res) => {
  try {
    res.render("main", { title: "Registrar-se", body: "content/register" });
  } catch (error) {
    console.log(error);
  }
};

exports.postRegister = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const existingUser = await authServices.findUserByEmail(email);
    if (existingUser) {
      return res.redirect("/register?error=username_exists");
    }
    await authServices.createUser(nome, email, senha);
    res.redirect("/login");
  } catch (error) {
    console.error("Erro ao criar usuario:", error);
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};
