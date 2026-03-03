import prisma from './seeds/client';
import { seedRoles } from './seeds/role.seed';
import { seedHolidays } from './seeds/holiday.seed';

async function main() {
  console.log('� Seeding database...\n');

  await seedRoles();
  await seedHolidays();

  console.log('\n🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
