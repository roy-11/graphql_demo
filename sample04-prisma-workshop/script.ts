import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Task1
  const result1 = await prisma.user.findMany();
  console.log(result1);

  // Task2
  // const result2 = await prisma.user.create({
  //   data: {
  //     email: "testemail6@test.test.test",
  //   },
  // });
  // console.log(result);

  // Task3
  // const result3 = await prisma.user.update({
  //   where: {
  //     email: "testemail6@test.test.test",
  //   },
  //   data: {
  //     name: "Alice",
  //   },
  // });
  // console.log(result3);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
