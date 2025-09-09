import prisma from "../../prisma/prisma.js";

class RegisterModel {
  // Obter todos os registros
  async findAll() {
    const registers = await prisma.register.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // console.log(registers);

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
  async create(
    date,
    moodLevel,
    sleepHours,
    notes
  ) {
    const newRegister = await prisma.register.create({
      data: {
        date,
        moodLevel,
        sleepHours,
        notes
      },
    });

    return newRegister;
  }

  // Atualizar um registro
  async update(
    id,
    date,
    moodLevel,
    sleepHours,
    notes
  ) {
    const register = await this.findById(id);

    if (!register) {
      return null;
    }

    // Atualize o registro existente com os novos dados
    const data = {};
    if (date !== undefined) {
      data.date = date;
    }
    if (moodLevel !== undefined) {
      data.moodLevel = moodLevel;
    }
    if (sleepHours !== undefined) {
      data.sleepHours = sleepHours;
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
