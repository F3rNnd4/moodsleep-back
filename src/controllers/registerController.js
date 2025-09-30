import RegisterModel from "../models/registerModel.js";

class RegisterController {
  // GET /api/registers
  async getAllRegisters(req, res) {
    try {
      const registers = await RegisterModel.findAll();
      res.json(registers);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      res.status(500).json({ error: "Erro ao buscar registros" });
    }
  }

  // GET /api/registers/:id
  async getRegisterById(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      const register = await RegisterModel.findById(id);

      if (!register) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }

      // Verificar se o registro pertence ao usuário
      if (register.userId !== userId) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      res.json(register);
    } catch (error) {
      console.error("Erro ao buscar registro:", error);
      res.status(500).json({ error: "Erro ao buscar registro" });
    }
  }

  // POST /api/registers
  async createRegister(req, res) {
    try {
      // Validação básica
      const { userId, date, moodLevel, sleepHours, notes } = req.body;

      // Verifica se os campos obrigatórios foram fornecidos
      if (!date || !moodLevel || !sleepHours) {
        return res
          .status(400)
          .json({ error: "Data, nível de humor e horas de sono são obrigatórios" });
      }

      // Validações específicas
      if (moodLevel < 1 || moodLevel > 5) {
        return res
          .status(400)
          .json({ error: "Nível de humor deve ser entre 1 e 5" });
      }

      if (sleepHours < 0 || sleepHours > 24) {
        return res
          .status(400)
          .json({ error: "Horas de sono devem ser entre 0 e 24" });
      }

      // Criar o novo registro
      const newRegister = await RegisterModel.create(
        userId,
        date,
        moodLevel,
        sleepHours,
        notes
      );

      if (!newRegister) {
        return res.status(400).json({ error: "Erro ao criar registro" });
      }

      res.status(201).json(newRegister);
    } catch (error) {
      console.error("Erro ao criar registro:", error);
      res.status(500).json({ error: "Erro ao criar registro" });
    }
  }

  // PUT /api/registers/:id
  async updateRegister(req, res) {
    try {
      const { id } = req.params;
      const { date, moodLevel, sleepHours, notes } = req.body;
      const userId = req.userId;

      // Validação básica - apenas campos que foram enviados
      if (moodLevel !== undefined && (moodLevel < 1 || moodLevel > 5)) {
        return res
          .status(400)
          .json({ error: "Nível de humor deve ser entre 1 e 5" });
      }

      if (sleepHours !== undefined && (sleepHours < 0 || sleepHours > 24)) {
        return res
          .status(400)
          .json({ error: "Horas de sono devem ser entre 0 e 24" });
      }

      // Atualizar o registro
      const updatedRegister = await RegisterModel.update(
        id,
        userId,
        date,
        moodLevel,
        sleepHours,
        notes
      );

      if (!updatedRegister) {
        return res.status(404).json({ error: "Registro não encontrado ou acesso negado" });
      }

      res.json(updatedRegister);
    } catch (error) {
      console.error("Erro ao atualizar registro:", error);
      res.status(500).json({ error: "Erro ao atualizar registro" });
    }
  }

  // DELETE /api/registers/:id
  async deleteRegister(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;

      // Remover o registro
      const result = await RegisterModel.delete(id, userId);

      if (!result) {
        return res.status(404).json({ error: "Registro não encontrado ou acesso negado" });
      }

      res.status(200).json({ message: "Registro removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover registro:", error);
      res.status(500).json({ error: "Erro ao remover registro" });
    }
  }
}

export default new RegisterController();
