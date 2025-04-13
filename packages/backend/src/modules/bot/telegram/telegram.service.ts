import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

import { MessageResponse } from './message.response';
import { Update } from './update';

@Injectable()
export class TelegramService {
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService
  ) {
    this.apiUrl = `https://api.telegram.org/bot${configService.get('TELEGRAM_BOT_TOKEN')}`;
  }

  /**
   * Get updates from Telegram using getUpdates endpoint.
   * You can poll at regular intervals.
   */
  async getUpdates(offset?: number): Promise<Update[]> {
    const url = `${this.apiUrl}/getUpdates`;
    const params = offset ? { offset } : {};

    const response = await lastValueFrom(
      this.httpService.get<{ ok: boolean; result: Update[]; description: string }>(url, { params })
    );
    if (!response.data.ok) {
      throw new Error(response.data.description);
    }
    return response.data.result;
  }

  /**
   * Send message to a specific chat.
   */
  async sendMessage(message: MessageResponse): Promise<void> {
    const url = `${this.apiUrl}/sendMessage`;

    await lastValueFrom(this.httpService.post(url, message));
  }
}
