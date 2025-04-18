import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

import ajv from '../ajv.instance';

export function ValidateBody(schema: object) {
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

    return request.body;
  })();
}
