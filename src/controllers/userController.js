import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

class UserController {
  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Obter usuário por ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.json(user);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  }

  // Registrar novo usuário
  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validação básica
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ error: "Os campos nome, email e senha são obrigatórios!" });
      }

      // Validação de formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex simples para validar email
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Formato de email inválido!" });
      }

      // Validação de senha mínima
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: "A senha deve ter pelo menos 6 caracteres!" });
      }

      // Verificar se o usuário já existe
      const userExists = await UserModel.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: "Este email já está em uso!" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 6);

      // Criar objeto do usuário
      const data = {
        name,
        email,
        password: hashedPassword,
      };

      // Criar usuário
      const user = await UserModel.create(data);

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        user,
      });
    } catch (error) {
      console.error("Erro ao criar um novo usuário: ", error);
      res.status(500).json({ error: "Erro ao criar um novo usuário" });
    }
  }

  // Atualizar usuário
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      // Verificar se o email já está em uso por outro usuário
      if (email && email !== user.email) {
        const emailExists = await UserModel.findByEmail(email);
        if (emailExists) {
          return res.status(400).json({ error: "Este email já está em uso!" });
        }
      }

      // Atualizar usuário
      const updatedData = {
        name: name || user.name,
        email: email || user.email,
        password: password ? await bcrypt.hash(password, 6) : user.password,
      };

      await UserModel.update(id, updatedData);
      res.json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  }

  // Excluir usuário
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      await UserModel.delete(id);
      res.json({ message: "Usuário excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).json({ error: "Erro ao excluir usuário" });
    }
  }
}

export default new UserController();
