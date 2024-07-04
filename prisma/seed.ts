import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tasks = [
    {
      title: 'Task 1',
      description: 'Description for Task 1',
      duedate: new Date('2024-07-10'),
      isDone: false,
    },
    {
      title: 'Task 2',
      description: 'Description for Task 2',
      duedate: new Date('2024-07-11'),
      isDone: true,
    },
    {
      title: 'Task 3',
      description: 'Description for Task 3',
      duedate: new Date('2024-07-12'),
      isDone: false,
    },
    {
      title: 'Task 4',
      description: 'Description for Task 4',
      duedate: new Date('2024-07-13'),
      isDone: true,
    },
    {
      title: 'Task 5',
      description: 'Description for Task 5',
      duedate: new Date('2024-07-14'),
      isDone: false,
    },
    {
      title: 'Task 6',
      description: 'Description for Task 6',
      duedate: new Date('2024-07-15'),
      isDone: true,
    },
    {
      title: 'Task 7',
      description: 'Description for Task 7',
      duedate: new Date('2024-07-16'),
      isDone: false,
    },
    {
      title: 'Task 8',
      description: 'Description for Task 8',
      duedate: new Date('2024-07-17'),
      isDone: true,
    },
  ];

  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
