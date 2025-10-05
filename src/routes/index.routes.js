import express from "express";

// Importar todas as rotas
import registerRouter from "./registerRoutes.js";

const router = express.Router();

// Configurar rotas
router.use("/register", registerRouter);

export default router;
