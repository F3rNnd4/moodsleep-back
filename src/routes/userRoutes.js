import express from "express";
import UserController from "../controllers/userController.js";

const userRouter = express.Router();

// Rotas de Usuário
// GET /api/users - Listar todos os usuários
userRouter.get("/", UserController.getAllUsers);

// GET /api/users/:id - Obter um usuário pelo ID
userRouter.get("/:id", UserController.getUserById);

// POST /api/users - Registrar um novo usuário
userRouter.post("/", UserController.register);

// PUT /api/users/:id - Atualizar um usuário
userRouter.put("/:id", UserController.updateUser);

// DELETE /api/users/:id - Excluir um usuário
userRouter.delete("/:id", UserController.deleteUser);

export default userRouter;
