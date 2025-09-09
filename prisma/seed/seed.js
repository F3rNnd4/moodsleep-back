import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seed...");

  // Código opcional para limpar o banco de dados antes de inserir novos dados
  await prisma.register.deleteMany({});
  await prisma.user.deleteMany({});

  // Criar usuários
  const user1 = await prisma.user.create({
    data: {
      name: "NBA Legends",
      email: "nba_legends@example.com",
      password: "securepassword",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Classic Rock",
      email: "classic_rock@example.com",
      password: "securepassword",
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "World Monuments",
      email: "world_monuments@example.com",
      password: "securepassword",
    },
  });

  console.log("Usuários criados. Inserindo registros...");

  // Registros para NBA Legends
  const nbaRecords = await Promise.all([
    prisma.register.create({
      data: {
        userId: user1.id,
        moodLevel: 5,
        sleepHours: 7.5,
        notes: "Me senti ótimo hoje!",
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

  // Registros para Classic Rock
  const rockRecords = await Promise.all([
    prisma.register.create({
      data: {
        userId: user2.id,
        moodLevel: 5,
        sleepHours: 7.0,
        notes: "Me senti inspirado hoje!",
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

  // Registros para World Monuments
  const monumentRecords = await Promise.all([
    prisma.register.create({
      data: {
        userId: user3.id,
        moodLevel: 5,
        sleepHours: 8.0,
        notes: "Me senti relaxado hoje!",
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
        notes: "Fiquei um pouco estressado.",
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
