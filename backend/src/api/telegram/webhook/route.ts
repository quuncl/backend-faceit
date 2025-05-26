import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body;

    // Проверяем, что это команда /start
    if (message?.text === '/start') {
      const chatId = message.chat.id.toString();
      const username = message.from.username;

      // Ищем пользователя по username в базе
      const user = await prisma.users.findFirst({
        where: { tag: username }
      });

      if (user) {
        // Привязываем Telegram к пользователю
        const telegram = await prisma.telegram.upsert({
          where: { user_id: user.id },
          update: {
            chatId,
            username,
            verified: true
          },
          create: {
            user_id: user.id,
            chatId,
            username,
            botToken: process.env.TELEGRAM_BOT_TOKEN || '',
            botUsername: "verif_faceitbot",
            verified: true
          }
        });

        return NextResponse.json({ 
          success: true, 
          message: 'Telegram успешно привязан',
          telegram 
        });
      }

      return NextResponse.json({ 
        success: false, 
        message: 'Пользователь не найден. Сначала зарегистрируйтесь на сайте.' 
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram Webhook Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
} 