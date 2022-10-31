import { Module } from '@nestjs/common';
import { Database } from 'src/database/database';
import { CervejaController } from './cerveja.controller';
import { CervejaService } from './cerveja.service';
import { IsCervejaExisteConstraint } from './is-cerveja-existe';

@Module({
  controllers: [CervejaController],
  providers: [CervejaService, Database, IsCervejaExisteConstraint],
})
export class CervejaModule {}
