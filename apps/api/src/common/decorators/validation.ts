/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Schema } from 'ajv';

import ajv from '../ajv.instance';

export function ValidateBody<T extends Schema>(schema: T) {
  const validate = ajv.compile(schema);

  return createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const isValid = validate(request.body);

    if (!isValid) {
      throw new BadRequestException({
        message: 'Validation failed',
        errors: validate.errors,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request.body;
  })();
}
