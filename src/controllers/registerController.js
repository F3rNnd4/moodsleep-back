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

  // POST /api/registers
  async createRegister(req, res) {
    try {
      // Validação básica
      const { date, moodLevel, sleepHours, notes } = req.body;

      // Verifica se todos os campos foram fornecidos
      if (!date || !moodLevel || !sleepHours || !notes) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Criar o novo registro
      const newRegister = await RegisterModel.create(
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
      const {
        date,
        moodLevel,
        sleepHours,
        notes
      } = req.body;

      // Validação básica
      if (!date || !moodLevel || !sleepHours || !notes) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      // Atualizar o registro
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

  // DELETE /api/registers/:id
  async deleteRegister(req, res) {
    try {
      const { id } = req.params;

      // Remover o registro
      const result = await RegisterModel.delete(id);

      if (!result) {
        return res.status(404).json({ error: "Registro não encontrado" });
      }

      res.status(200).json({ message: "Registro removido com sucesso" });
    } catch (error) {
      console.error("Erro ao remover registro:", error);
      res.status(500).json({ error: "Erro ao remover registro" });
    }
  }
}

export default new RegisterController();
