import express from "express";

// Importar todas as rotas
import userRouter from "./user.routes.js";
import registerRouter from "./registerRoutes.js";

const router = express.Router();

// Rotas públicas
router.use("/user", userRouter);

// Rotas protegidas
router.use("/register", registerRouter);

export default router;
