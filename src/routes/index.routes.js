import express from "express";

// Importar todas as rotas
import authRouter from "./auth.routes.js";
import registerRouter from "./registerRoutes.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Rotas públicas
router.use("/auth", authRouter);

// Rotas protegidas
router.use(authMiddleware);
router.use("/register", registerRouter);

export default router;
