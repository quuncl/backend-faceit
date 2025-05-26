import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const totalUsers = await prisma.users.count();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const usersToday = await prisma.users.count({
      where: {
        created_at: { gte: today },
      },
    });
    const lastUser = await prisma.users.findFirst({ orderBy: { id: 'desc' } });
    const firstUser = await prisma.users.findFirst({ orderBy: { id: 'asc' } });
    return NextResponse.json({
      totalUsers,
      usersToday,
      lastUserTag: lastUser?.tag || null,
      firstUserTag: firstUser?.tag || null,
      lastCreated: lastUser?.created_at || null,
      firstCreated: firstUser?.created_at || null,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
} 