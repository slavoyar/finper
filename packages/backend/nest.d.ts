import 'fastify';

import { User } from '@external/telegram/interfaces/user';

declare module 'fastify' {
  interface FastifyRequest {
    user: User; // or define a proper user type instead of any
  }
}
