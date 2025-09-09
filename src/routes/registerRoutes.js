import express from "express";
import RegisterController from "../controllers/registerController.js";

const registerRouter = express.Router();

// Rotas de Registro
// POST /api/register - Registrar um novo usuário
registerRouter.post("/", RegisterController.createRegister);

// GET /api/register/:id - Obter um registro pelo ID
registerRouter.get("/:id", RegisterController.getRegisterById);

// POST /api/register - Criar um novo registro
registerRouter.post("/", RegisterController.createRegister);

// PUT /api/register/:id - Atualizar um registro
registerRouter.put("/:id", RegisterController.updateRegister);

// DELETE /api/register/:id - Remover um registro
registerRouter.delete("/:id", RegisterController.deleteRegister);

export default registerRouter;
