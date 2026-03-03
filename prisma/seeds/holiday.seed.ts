import prisma from './client';

export async function seedHolidays() {
  console.log('🎌 Seeding Holidays Indonesia 2026...');

  const holidays2026 = [
    { name: 'Tahun Baru Masehi', date: new Date('2026-01-01') },
    { name: "Isra Mi'raj Nabi Muhammad SAW", date: new Date('2026-02-08') },
    { name: 'Tahun Baru Imlek', date: new Date('2026-02-17') },
    { name: 'Hari Suci Nyepi', date: new Date('2026-03-19') },
    {
      name: 'Hari Raya Idul Fitri 1447H (Hari 1)',
      date: new Date('2026-03-20'),
    },
    {
      name: 'Hari Raya Idul Fitri 1447H (Hari 2)',
      date: new Date('2026-03-21'),
    },
    { name: 'Wafat Isa Al Masih', date: new Date('2026-04-03') },
    { name: 'Hari Buruh Internasional', date: new Date('2026-05-01') },
    { name: 'Hari Raya Waisak', date: new Date('2026-05-12') },
    { name: 'Kenaikan Isa Al Masih', date: new Date('2026-05-14') },
    { name: 'Hari Raya Idul Adha 1447H', date: new Date('2026-05-27') },
    { name: 'Hari Lahir Pancasila', date: new Date('2026-06-01') },
    { name: 'Tahun Baru Islam 1448H', date: new Date('2026-06-17') },
    { name: 'Hari Kemerdekaan RI', date: new Date('2026-08-17') },
    { name: 'Maulid Nabi Muhammad SAW', date: new Date('2026-08-28') },
    { name: 'Hari Raya Natal', date: new Date('2026-12-25') },
  ];

  const result = await prisma.holiday.createMany({
    data: holidays2026.map((h) => ({
      name: h.name,
      date: h.date,
      is_national: true,
      tenant_id: null,
    })),
    skipDuplicates: true,
  });

  console.log(`   ✅ ${result.count} holidays created`);
}
