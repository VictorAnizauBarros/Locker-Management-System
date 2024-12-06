const app = require("./app"); // Importa a instância do express. 

const PORT = process.env.PORT || 3000; // Define a porta em que o servidor irá rodar. 

// Inicializa o servidor. 
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});
