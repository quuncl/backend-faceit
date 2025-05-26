import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, userId, chatId, username } = body;

    switch (action) {
      case 'linkUser': {
        // Привязка пользователя к Telegram
        const telegram = await prisma.telegram.upsert({
          where: { user_id: userId },
          update: {
            chatId,
            username,
            verified: false
          },
          create: {
            user_id: userId,
            chatId,
            username,
            botToken: process.env.TELEGRAM_BOT_TOKEN || '',
            botUsername: "verif_faceitbot",
            verified: false
          }
        });
        return NextResponse.json({ success: true, telegram });
      }

      case 'verifyUser': {
        // Верификация пользователя
        const telegram = await prisma.telegram.update({
          where: { user_id: userId },
          data: { verified: true }
        });
        return NextResponse.json({ success: true, telegram });
      }

      case 'getUserStatus': {
        // Получение статуса пользователя
        const telegram = await prisma.telegram.findUnique({
          where: { user_id: userId },
          include: { user: true }
        });
        return NextResponse.json({ success: true, telegram });
      }

      case 'unlinkUser': {
        // Отвязка пользователя от Telegram
        const telegram = await prisma.telegram.delete({
          where: { user_id: userId }
        });
        return NextResponse.json({ success: true, telegram });
      }

      default:
        return NextResponse.json({ success: false, error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Telegram API Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' });
  }
} 