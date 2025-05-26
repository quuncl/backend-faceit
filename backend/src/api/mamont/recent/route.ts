import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      orderBy: { id: 'desc' },
      take: 5,
      select: { 
        tag: true,
        status: true 
      },
    });
    return NextResponse.json({ users });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
} 