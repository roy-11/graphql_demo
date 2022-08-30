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

  // Task5
  // const result5 = await prisma.post.create({
  //   data: {
  //     title: "Hello World",
  //   },
  // });
  // console.log(result5);

  // Task6
  // const result6 = await prisma.post.update({
  //   where: {
  //     id: 4,
  //   },
  //   data: {
  //     author: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //   },
  // });
  // console.log(result6);
  //

  // Task7
  const result7 = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  });
  console.log(result7);

  // Task8
  const result8 = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  console.log(result8);

  // Task9
  const result9 = await prisma.user.findUnique({
    where: {
      id: 1,
    },
    include: {
      posts: true,
    },
  });
  console.log(result9);

  // Task10
  // const result10 = await prisma.user.create({
  //   data: {
  //     name: "test",
  //     email: "testemailTask10@test.test.test",
  //     posts: {
  //       create: {
  //         title: "This is Test",
  //       },
  //     },
  //   },
  // });
  // console.log("LOG: > main > result10", result10);
  //

  // Task11
  const result11 = await prisma.user.findMany({
    where: {
      name: {
        startsWith: "t",
      },
    },
  });
  console.log(" -------------------------");
  console.log("main > result11", result11);
  console.log(" -------------------------");

  // Task12
  const result12 = await prisma.user.findMany({
    skip: 2,
    take: 2,
  });
  console.log(" -------------------------");
  console.log("main > result12", result12);
  console.log(" -------------------------");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
