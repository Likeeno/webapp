import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding JAP services...');

  // Service 4343 - Instagram Likes
  await prisma.jAPService.upsert({
    where: { japServiceId: 4343 },
    update: {
      name: 'Instagram Likes',
      type: 'like',
      category: 'Instagram',
      minQuantity: 10,
      maxQuantity: 5000000,
      isActive: true,
    },
    create: {
      japServiceId: 4343,
      name: 'Instagram Likes',
      type: 'like',
      category: 'Instagram',
      rate: 0, // Price to be set later
      minQuantity: 10,
      maxQuantity: 5000000,
      refillAvailable: false,
      cancelAvailable: false,
      isActive: true,
    },
  });

  // Service 3305 - Instagram Followers
  await prisma.jAPService.upsert({
    where: { japServiceId: 3305 },
    update: {
      name: 'Instagram Followers',
      type: 'follower',
      category: 'Instagram',
      minQuantity: 1000,
      maxQuantity: 500000,
      isActive: true,
    },
    create: {
      japServiceId: 3305,
      name: 'Instagram Followers',
      type: 'follower',
      category: 'Instagram',
      rate: 0, // Price to be set later
      minQuantity: 1000,
      maxQuantity: 500000,
      refillAvailable: false,
      cancelAvailable: false,
      isActive: true,
    },
  });

  // Service 7102 - Telegram Members
  await prisma.jAPService.upsert({
    where: { japServiceId: 7102 },
    update: {
      name: 'Telegram Members',
      type: 'member',
      category: 'Telegram',
      minQuantity: 10,
      maxQuantity: 50000,
      isActive: true,
    },
    create: {
      japServiceId: 7102,
      name: 'Telegram Members',
      type: 'member',
      category: 'Telegram',
      rate: 0, // Price to be set later
      minQuantity: 10,
      maxQuantity: 50000,
      refillAvailable: false,
      cancelAvailable: false,
      isActive: true,
    },
  });

  console.log('✅ JAP services seeded successfully!');
  console.log('\n📋 Services configured:');
  console.log('  - Service 4343: Instagram Likes (min: 10, max: 5,000,000)');
  console.log('  - Service 3305: Instagram Followers (min: 1,000, max: 500,000)');
  console.log('  - Service 7102: Telegram Members (min: 10, max: 50,000)');
  console.log('\n💡 Note: Prices (rate) are set to 0. Update them when you have the prices.');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
