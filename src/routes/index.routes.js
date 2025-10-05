import express from "express";
import RegisterController from "../controllers/registerController.js";

const router = express.Router();

// Rotas de registros (humor e sono)
router.get("/api/registers", RegisterController.getAllRegisters);
router.get("/api/registers/:id", RegisterController.getRegisterById);
router.post("/api/registers", RegisterController.createRegister);
router.put("/api/registers/:id", RegisterController.updateRegister);
router.delete("/api/registers/:id", RegisterController.deleteRegister);

export default router;