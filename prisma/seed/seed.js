import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed...");

  // Código opcional para limpar o banco de dados antes de inserir novos dados
  await prisma.register.deleteMany({});
  await prisma.user.deleteMany({});

  // Criar usuários com senhas hasheadas
  const user1 = await prisma.user.create({
    data: {
      name: "Mia Cruz",
      email: "mia_cruz@example.com",
      password: await bcrypt.hash("mercyuponourselves", 6),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Jade Smith",
      email: "jade_smith@example.com",
      password: await bcrypt.hash("youredonefor", 6),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Rafaela Silva",
      email: "rafaela_silva@example.com",
      password: await bcrypt.hash("nolongeryou", 6),
    },
  });

  console.log("Usuários criados. Inserindo registros...");

  // Registros para Mia Cruz
  const miaRecords = await Promise.all([
    prisma.register.create({
      data: {
        userId: user1.id,
        moodLevel: 5,
        sleepHours: 7.5,
        notes: "Me senti ótima hoje!",
      },
    }),
    prisma.register.create({
      data: {
        userId: user1.id,
        moodLevel: 4,
        sleepHours: 6.0,
        notes: "Tive um dia cansativo.",
      },
    }),
    prisma.register.create({
      data: {
        userId: user1.id,
        moodLevel: 3,
        sleepHours: 5.0,
        notes: "Não dormi bem.",
      },
    }),
  ]);

  // Registros para Jade Smith
  const jadeRecords = await Promise.all([
    prisma.register.create({
      data: {
        userId: user2.id,
        moodLevel: 5,
        sleepHours: 7.0,
        notes: "Me senti inspirada hoje!",
      },
    }),
    prisma.register.create({
      data: {
        userId: user2.id,
        moodLevel: 4,
        sleepHours: 6.5,
        notes: "Tive um dia produtivo.",
      },
    }),
    prisma.register.create({
      data: {
        userId: user2.id,
        moodLevel: 3,
        sleepHours: 5.5,
        notes: "Não consegui me concentrar.",
      },
    }),
  ]);

  // Registros para Rafaela Silva
  const rafaelaRecords = await Promise.all([
    prisma.register.create({
      data: {
        userId: user3.id,
        moodLevel: 5,
        sleepHours: 8.0,
        notes: "Me senti relaxada hoje!",
      },
    }),
    prisma.register.create({
      data: {
        userId: user3.id,
        moodLevel: 4,
        sleepHours: 7.0,
        notes: "Tive um dia tranquilo.",
      },
    }),
    prisma.register.create({
      data: {
        userId: user3.id,
        moodLevel: 3,
        sleepHours: 6.0,
        notes: "Fiquei um pouco estressada.",
      },
    }),
  ]);

  console.log(
    `Seed concluído! Criadas ${await prisma.user.count()} usuários e ${await prisma.register.count()} seus registros.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
