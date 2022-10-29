import { Module } from '@nestjs/common';
import { Database } from 'src/database/database';
import { CervejaController } from './cerveja.controller';
import { CervejaService } from './cerveja.service';

@Module({
  controllers: [CervejaController],
  providers: [CervejaService, Database],
})
export class CervejaModule {}
