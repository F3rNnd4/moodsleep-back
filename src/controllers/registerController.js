import RegisterModel from "../models/registerModel.js";

class RegisterController {
  // GET /api/registers - Listar todos os registros
  async getAllRegisters(req, res) {
    try {
      const registers = await RegisterModel.findAll();
      res.json(registers);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      res.status(500).json({ error: "Erro ao buscar registros" });
    }
  }

  // GET /api/registers/:id - Obter um registro pelo ID
  async getRegisterById(req, res) {
    try {
      const { id } = req.params;
      const register = await RegisterModel.findById(id);

      if (!register) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }

      res.json(register);
    } catch (error) {
      console.error("Erro ao buscar registro:", error);
      res.status(500).json({ error: "Erro ao buscar registro" });
    }
  }

  // POST /api/registers - Criar um novo registro
  async createRegister(req, res) {
    try {
      const { date, moodLevel, sleepHours, notes } = req.body;

      // Validações
      if (!date || !moodLevel || !sleepHours) {
        return res.status(400).json({
          error: "Data, nível de humor e horas de sono são obrigatórios",
        });
      }

      if (moodLevel < 1 || moodLevel > 5) {
        return res.status(400).json({
          error: "Nível de humor deve estar entre 1 e 5",
        });
      }

      if (sleepHours < 0 || sleepHours > 24) {
        return res.status(400).json({
          error: "Horas de sono devem estar entre 0 e 24",
        });
      }

      const newRegister = await RegisterModel.create(
        date,
        moodLevel,
        sleepHours,
        notes
      );

      res.status(201).json(newRegister);
    } catch (error) {
      console.error("Erro ao criar registro:", error);
      res.status(500).json({ error: "Erro ao criar registro" });
    }
  }

  // PUT /api/registers/:id - Atualizar um registro
  async updateRegister(req, res) {
    try {
      const { id } = req.params;
      const { date, moodLevel, sleepHours, notes } = req.body;

      // Validações
      if (moodLevel !== undefined && (moodLevel < 1 || moodLevel > 5)) {
        return res.status(400).json({
          error: "Nível de humor deve estar entre 1 e 5",
        });
      }

      if (sleepHours !== undefined && (sleepHours < 0 || sleepHours > 24)) {
        return res.status(400).json({
          error: "Horas de sono devem estar entre 0 e 24",
        });
      }

      const updatedRegister = await RegisterModel.update(
        id,
        date,
        moodLevel,
        sleepHours,
        notes
      );

      if (!updatedRegister) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }

      res.json(updatedRegister);
    } catch (error) {
      console.error("Erro ao atualizar registro:", error);
      res.status(500).json({ error: "Erro ao atualizar registro" });
    }
  }

  // DELETE /api/registers/:id - Remover um registro
  async deleteRegister(req, res) {
    try {
      const { id } = req.params;

      const deleted = await RegisterModel.delete(id);

      if (!deleted) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }

      res.json({ message: "Registro removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover registro:", error);
      res.status(500).json({ error: "Erro ao remover registro" });
    }
  }
}

export default new RegisterController();