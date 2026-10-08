import { credentials } from '@grpc/grpc-js';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

const INVEST_API_URL = 'invest-public-api.tbank.ru:443';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INSTRUMENTS_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: INVEST_API_URL,
          package: 'tinkoff.public.invest.api.contract.v1',
          protoPath: join(__dirname, './protos/instruments.proto'),
          loader: { includeDirs: [join(__dirname, './protos')] },
          credentials: credentials.createSsl(),
        },
      },
      {
        name: 'MARKETDATA_CLIENT',
        transport: Transport.GRPC,
        options: {
          url: INVEST_API_URL,
          package: 'tinkoff.public.invest.api.contract.v1',
          protoPath: join(__dirname, './protos/marketdata.proto'),
          loader: { includeDirs: [join(__dirname, './protos')] },
          credentials: credentials.createSsl(),
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class TinkoffModule {}
