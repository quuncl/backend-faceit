import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || '';
    const tag = cookieHeader
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('tag='))
      ?.split('=')[1];

    if (!tag) {
      return NextResponse.json({ success: false, error: 'Tag не найден в cookie' });
    }

    // Проверяем, есть ли уже такой tag
    const existing = await prisma.users.findFirst({ where: { tag } });
    if (!existing) {
      await prisma.users.create({ data: { tag } });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
} 