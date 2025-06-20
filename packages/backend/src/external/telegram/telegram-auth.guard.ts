import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { FastifyRequest } from 'fastify';

import { User } from './interfaces';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const initData = request.headers['x-telegram-init-data'];

    if (!initData || typeof initData !== 'string') {
      if (this.isDevMode()) {
        return true;
      }
      throw new UnauthorizedException('Missing initData header');
    }

    const params = new URLSearchParams(initData);
    const data: Record<string, string> = {};

    for (const [key, value] of params.entries()) {
      data[key] = value;
    }
    const receivedHash = data.hash;
    delete data.hash;

    const dataCheckString = Object.entries(data)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join('\n');

    const botToken = this.configService.get('TELEGRAM_BOT_TOKEN') as string;
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (hmac !== receivedHash) {
      throw new UnauthorizedException('Invalid initData');
    }

    try {
      request.user = JSON.parse(data.user) as unknown as User;
    } catch {
      throw new UnauthorizedException('Invalid user JSON');
    }

    return true;
  }

  isDevMode(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }
}
