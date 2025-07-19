const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create sample users
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        name: 'John Doe',
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane@example.com' },
      update: {},
      create: {
        email: 'jane@example.com',
        name: 'Jane Smith',
      },
    }),
  ]);

  // Create sample banks
  const banks = await Promise.all([
    prisma.bank.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Chase Bank',
        website: 'https://www.chase.com',
      },
    }),
    prisma.bank.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Bank of America',
        website: 'https://www.bankofamerica.com',
      },
    }),
    prisma.bank.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Wells Fargo',
        website: 'https://www.wellsfargo.com',
      },
    }),
  ]);

  // Create sample credit cards
  const creditCards = await Promise.all([
    prisma.creditCard.upsert({
      where: { id: 1 },
      update: {},
      create: {
        name: 'Chase Sapphire Preferred',
        bankId: 1,
      },
    }),
    prisma.creditCard.upsert({
      where: { id: 2 },
      update: {},
      create: {
        name: 'Chase Freedom Unlimited',
        bankId: 1,
      },
    }),
    prisma.creditCard.upsert({
      where: { id: 3 },
      update: {},
      create: {
        name: 'Bank of America Cash Rewards',
        bankId: 2,
      },
    }),
  ]);

  console.log('Created users:', users);
  console.log('Created banks:', banks);
  console.log('Created credit cards:', creditCards);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });