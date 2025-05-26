import { NextResponse } from 'next/server';
import { setWebhook } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      return NextResponse.json({ 
        success: false, 
        error: 'TELEGRAM_BOT_TOKEN not set' 
      });
    }

    // Получаем URL для вебхука
    const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/telegram/webhook`;
    
    // Устанавливаем вебхук
    const success = await setWebhook(token, webhookUrl);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Webhook установлен успешно' 
      });
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Failed to set webhook' 
    });
  } catch (error) {
    console.error('Setup Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
} 