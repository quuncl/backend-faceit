import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { id, direction } = await request.json();
  const team = await prisma.team.findUnique({ where: { id: Number(id) } });
  if (!team) return NextResponse.json({ error: 'Team not found' }, { status: 404 });

  // Найти команду для swap
  const swapTeam = await prisma.team.findFirst({
    where: {
      rank: direction === 'up' ? { lt: team.rank } : { gt: team.rank }
    },
    orderBy: { rank: direction === 'up' ? 'desc' : 'asc' }
  });
  if (!swapTeam) return NextResponse.json({ error: 'No team to swap' }, { status: 400 });

  // Поменять местами rank
  await prisma.team.update({ where: { id: team.id }, data: { rank: swapTeam.rank } });
  await prisma.team.update({ where: { id: swapTeam.id }, data: { rank: team.rank } });

  return NextResponse.json({ success: true });
} 