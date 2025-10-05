import prisma from "../../prisma/prisma.js";

class RegisterModel {
  // Obter todos os registros ordenados por data (mais recente primeiro)
  async findAll() {
    const registers = await prisma.register.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return registers;
  }

  // Obter um registro pelo ID
  async findById(id) {
    const register = await prisma.register.findUnique({
      where: {
        id: Number(id),
      },
    });
    return register;
  }

  // Criar um novo registro
  async create(date, moodLevel, sleepHours, notes) {
    const newRegister = await prisma.register.create({
      data: {
        date: new Date(date),
        moodLevel: Number(moodLevel),
        sleepHours: Number(sleepHours),
        notes: notes || null,
      },
    });
    return newRegister;
  }

  // Atualizar um registro
  async update(id, date, moodLevel, sleepHours, notes) {
    const register = await this.findById(id);

    if (!register) {
      return null;
    }

    // Preparar dados para atualização
    const data = {};
    if (date !== undefined) {
      data.date = new Date(date);
    }
    if (moodLevel !== undefined) {
      data.moodLevel = Number(moodLevel);
    }
    if (sleepHours !== undefined) {
      data.sleepHours = Number(sleepHours);
    }
    if (notes !== undefined) {
      data.notes = notes;
    }

    const registerUpdated = await prisma.register.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return registerUpdated;
  }

  // Remover um registro
  async delete(id) {
    const register = await this.findById(id);

    if (!register) {
      return null;
    }

    await prisma.register.delete({
      where: {
        id: Number(id),
      },
    });

    return true;
  }
}

export default new RegisterModel();