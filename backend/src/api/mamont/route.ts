import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, id, status } = body;

    switch (action) {
      case 'getMamont': {
        const user = await prisma.users.findFirst({ where: { tag: id } });
        return NextResponse.json({ success: !!user });
      }

      case 'clearMamont': {
        const updated = await prisma.users.updateMany({ where: { tag: id }, data: { status: 0 } });
        return NextResponse.json({ success: updated.count > 0 });
      }

      case 'setStatus': {
        const updated = await prisma.users.updateMany({ where: { tag: id }, data: { status } });
        return NextResponse.json({ success: updated.count > 0 });
      }

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get('tag');
  if (!tag) return NextResponse.json({ error: 'No tag' }, { status: 400 });
  const user = await prisma.users.findFirst({ where: { tag } });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ status: user.status });
} 