import prisma from "./prisma.js";

async function main() {
  console.log("🌱 Iniciando seed do banco de dados...");

  await prisma.register.deleteMany({});
  console.log("🗑️  Registros antigos removidos");

  const registers = await prisma.register.createMany({
    data: [
      {
        date: new Date("2025-10-01"),
        moodLevel: 4,
        sleepHours: 7.5,
        notes: "Dia produtivo, consegui terminar o projeto de matemática",
      },
      {
        date: new Date("2025-10-02"),
        moodLevel: 3,
        sleepHours: 6.0,
        notes: "Dormi pouco, estava um pouco cansado",
      },
      {
        date: new Date("2025-10-03"),
        moodLevel: 5,
        sleepHours: 8.5,
        notes: "Excelente dia! Consegui dormir bem e acordei disposto",
      },
      {
        date: new Date("2025-10-04"),
        moodLevel: 2,
        sleepHours: 5.0,
        notes: "Dia difícil, tive problemas para dormir",
      },
      {
        date: new Date("2025-10-05"),
        moodLevel: 4,
        sleepHours: 7.0,
        notes: "Melhorando, consegui relaxar mais hoje",
      },
    ],
  });

  console.log(`✅ ${registers.count} registros criados com sucesso!`);
}

main()
  .catch((e) => {
    console.error("❌ Erro ao fazer seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });