import { Module, Global } from '@nestjs/common';
import { knex } from 'knex';

const knexConfig = require('../../knexfile.js');

const env = process.env.NODE_ENV || 'development';
const knexInstance = knex(knexConfig[env]);

@Global()
@Module({
  providers: [
    {
      provide: 'KNEX_CONNECTION',
      useValue: knexInstance,
    },
  ],
  exports: ['KNEX_CONNECTION'],
})
export class KnexModule {}
