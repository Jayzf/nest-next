import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RenderModule } from 'nest-next';
import Next from 'next';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public'),
    }),
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
      })
    ),
    ApiModule,
    ViewModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
