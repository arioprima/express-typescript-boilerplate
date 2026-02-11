import prisma from './client';

export async function seedRoles() {
  console.log('🔑 Seeding Roles...');

  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'owner' },
      update: {},
      create: {
        name: 'owner',
        display_name: 'Owner',
        permissions: [
          'tenant:manage',
          'outlet:manage',
          'user:manage',
          'role:manage',
          'shift:manage',
          'schedule:manage',
          'schedule:publish',
          'attendance:manage',
          'attendance:approve',
          'swap:manage',
          'swap:approve',
          'notification:manage',
          'holiday:manage',
          'report:view',
        ],
      },
    }),
    prisma.role.upsert({
      where: { name: 'manager' },
      update: {},
      create: {
        name: 'manager',
        display_name: 'Manager',
        permissions: [
          'outlet:view',
          'user:view',
          'user:create',
          'shift:manage',
          'schedule:manage',
          'schedule:publish',
          'attendance:manage',
          'attendance:approve',
          'swap:approve',
          'notification:send',
          'report:view',
        ],
      },
    }),
    prisma.role.upsert({
      where: { name: 'staff' },
      update: {},
      create: {
        name: 'staff',
        display_name: 'Staff',
        permissions: [
          'schedule:view_own',
          'attendance:clock',
          'attendance:view_own',
          'swap:request',
          'notification:view_own',
        ],
      },
    }),
  ]);

  console.log(`   ✅ ${roles.length} roles created`);
}
