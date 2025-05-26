import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const team = await prisma.team.findUnique({
      where: { id: Number(params.id) }
    });
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }
    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const team = await prisma.team.update({
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        members: body.members,
        image: body.image,
      }
    });
    return NextResponse.json(team);
  } catch (error) {
    console.error('Error updating team:', error);
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.team.delete({
      where: { id: Number(params.id) }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team:', error);
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
} 