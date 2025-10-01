import express from "express";

// Importar todas as rotas
import userRouter from "./userRoutes.js";
import registerRouter from "./registerRoutes.js";

const router = express.Router();

router.use("/user", userRouter);
router.use("/register", registerRouter);

export default router;
