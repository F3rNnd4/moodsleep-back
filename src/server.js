import express from "express";
import { config } from "dotenv";
import cors from "cors";

import routes from "./routes/index.routes.js";

config(); // Carrega variáveis de ambiente do arquivo .env

const port = process.env.PORT || 5000;

// Inicializa o Express
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Parse de JSON

// Rotas
app.use("/", routes);

// Iniciar o servidor
app.listen(port, () => {
  console.log(`🌙 MoodSleep ON | Porta ${port}`);
});