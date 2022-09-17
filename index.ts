import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      age: 10,
      name: "Sabin Adams",
    },
  });

  const users = await prisma.user.findMany();

  console.table(users);
}

main();
