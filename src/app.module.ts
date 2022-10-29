import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CervejaModule } from './cerveja/cerveja.module';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { Database } from './database/database';

@Module({
  imports: [CervejaModule],
  controllers: [],
  providers: [
    Database,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
  ],
})
export class AppModule {}
