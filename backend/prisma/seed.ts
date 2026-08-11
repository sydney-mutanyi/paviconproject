import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing data
  await prisma.task.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Create seed user
  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.create({
    data: {
      email: 'admin@pavicontech.com',
      name: 'Sydney Mutanyi',
      password: hashedPassword,
    },
  });

  console.log(`Created user: ${user.email}`);

  // 3. Create Projects
  const project1 = await prisma.project.create({
    data: {
      name: 'Pavicon Website Redesign',
      description: 'Redesigning the company landing page and customer portal with modern UI.',
      userId: user.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      name: 'Task Manager App',
      description: 'Developing the NestJS and Vue.js task management platform.',
      userId: user.id,
    },
  });

  console.log('Created projects.');

  // 4. Create Tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Design UI/UX Mockups',
        description: 'Create Figma designs for the new landing page.',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        projectId: project1.id,
      },
      {
        title: 'Integrate TailwindCSS',
        description: 'Set up styling and responsive utilities on frontend.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        projectId: project1.id,
      },
      {
        title: 'Deploy to Production Server',
        description: 'Configure Nginx reverse proxy, SSL certificates via Certbot, and CI/CD pipelines.',
        status: 'PENDING',
        priority: 'HIGH',
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        projectId: project1.id,
      },
      {
        title: 'Database Schema Setup',
        description: 'Define Prisma schema for MongoDB and connect to replica set.',
        status: 'COMPLETED',
        priority: 'HIGH',
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        projectId: project2.id,
      },
      {
        title: 'Setup JWT Authentication',
        description: 'Implement NestJS passport guards, JWT validation, and password hashing.',
        status: 'COMPLETED',
        priority: 'MEDIUM',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        projectId: project2.id,
      },
      {
        title: 'Add Projects & Tasks Seed Script',
        description: 'Write a typescript seed script to easily populate the database with test data.',
        status: 'IN_PROGRESS',
        priority: 'LOW',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        projectId: project2.id,
      },
    ],
  });

  console.log('Created tasks.');
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
