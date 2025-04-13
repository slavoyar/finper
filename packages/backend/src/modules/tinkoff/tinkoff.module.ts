import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INSTRUMENTS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'tinkoff.public.invest.api.contract.v1',
          protoPath: join(__dirname, './protos/instruments.proto'),
          loader: { includeDirs: [join(__dirname, './protos')] },
        },
      },
      {
        name: 'ORDERS_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'tinkoff.public.invest.api.contract.v1',
          protoPath: join(__dirname, './protos/orders.proto'),
          loader: { includeDirs: [join(__dirname, './protos')] },
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TinkoffModule {}
