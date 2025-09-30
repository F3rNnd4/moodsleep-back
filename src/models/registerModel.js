import prisma from "../../prisma/prisma.js";

class RegisterModel {
  // Obter todos os registros
  async findAll() {
    const registers = await prisma.register.findMany({});
    
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

  // Obter registros por usuário
  async findByUserId(userId) {
    const registers = await prisma.register.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return registers;
  }

  // Criar um novo registro
  async create(
    userId,
    date,
    moodLevel,
    sleepHours,
    notes
  ) {
    const newRegister = await prisma.register.create({
      data: {
        userId: Number(userId),
        date: new Date(date),
        moodLevel: Number(moodLevel),
        sleepHours: Number(sleepHours),
        notes
      },
    });

    return newRegister;
  }

  // Atualizar um registro
  async update(
    id,
    userId,
    date,
    moodLevel,
    sleepHours,
    notes
  ) {
    const register = await this.findById(id);

    if (!register) {
      return null;
    }

    // Verificar se o registro pertence ao usuário
    if (register.userId !== Number(userId)) {
      return null;
    }

    // Atualize o registro existente com os novos dados
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
  async delete(id, userId) {
    const register = await this.findById(id);

    if (!register) {
      return null;
    }

    // Verificar se o registro pertence ao usuário
    if (register.userId !== Number(userId)) {
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
