import { ValidateBody } from '@common/decorators/validation';
import { Controller } from '@nestjs/common';

@Controller('bot')
export class BotController {
  test(@ValidateBody({}) body: { userId: string }) {
    body.userId;
    console.log('test');
  }
}
