// src/tests/test.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

describe('Database Seed Tests', () => {
  beforeAll(async () => {
    // Clear existing data
    await prisma.call.deleteMany({});
    await prisma.status.deleteMany({});
    await prisma.callType.deleteMany({});
    await prisma.user.deleteMany({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Insert User', async () => {
    const hashedPassword = await bcrypt.hash('abdo159abdo', 10);
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'testuser@example.com',
        password: hashedPassword,
        role: 'USER',
      },
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('testuser@example.com');
  });

  test('Insert Statuses', async () => {
    const statuses = await prisma.status.createMany({
      data: [
        { name: 'Ongoing', color: '#FFA500' },
        { name: 'Completed', color: '#008000' },
        { name: 'Failed to start', color: '#FF0000' },
      ],
    });

    expect(statuses.count).toBe(3);
  });

  test('Insert Call Types', async () => {
    const callTypes = await prisma.callType.createMany({
      data: [
        { type: 'Verification' },
        { type: 'Sales' },
        { type: 'Customer Support' },
      ],
    });

    expect(callTypes.count).toBe(3);
  });

  test('Insert Calls', async () => {
    const user = await prisma.user.findFirst({
      where: { email: 'testuser@example.com' },
    });

    const callsData = [
      { id: 'call_1', clientName: 'Client A', reference: 'REF001', duration: 300, statusId: 1, initiatedById: user?.id, notes: 'Note 1', summary: 'Summary 1', clientAddress: 'Address 1', postCode: '12345', hasPOA: false, success: true },
      { id: 'call_2', clientName: 'Client B', reference: 'REF002', duration: 150, statusId: 2, initiatedById: user?.id, notes: 'Note 2', summary: 'Summary 2', clientAddress: 'Address 2', postCode: '12346', hasPOA: false, success: true },
      { id: 'call_3', clientName: 'Client C', reference: 'REF003', duration: 200, statusId: 3, initiatedById: user?.id, notes: 'Note 3', summary: 'Summary 3', clientAddress: 'Address 3', postCode: '12347', hasPOA: false, success: false },
    ];

    const callTypeIds = await prisma.callType.findMany({ select: { id: true } });

    for (const call of callsData) {
      // Select a random callTypeId from the retrieved list
      const randomCallTypeId = callTypeIds[Math.floor(Math.random() * callTypeIds.length)].id;

      await prisma.call.create({ data: { 
          ...call, 
          callTypeId: randomCallTypeId, 
          initiatedById: 1 // Provide a default value if undefined
      } });
    }

    const calls = await prisma.call.findMany();
    expect(calls.length).toBe(callsData.length);
  });
});
