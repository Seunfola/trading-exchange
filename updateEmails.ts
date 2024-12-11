import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateEmails() {
  try {
    const result = await prisma.$executeRawUnsafe(`
      UPDATE "User" SET email = LOWER(email);
    `);
    console.log('Emails updated:', result);
  } catch (error) {
    console.error('Error updating emails:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateEmails();
