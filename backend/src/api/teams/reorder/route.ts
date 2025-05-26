import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: Request) {
  const { ids } = await request.json(); // массив id в новом порядке
  for (let i = 0; i < ids.length; i++) {
    await prisma.team.update({
      where: { id: Number(ids[i]) },
      data: { rank: i }
    });
  }
  return NextResponse.json({ success: true });
} 