import { Module } from '@nestjs/common';
import { ProcessorModule } from './processor/processor.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';


import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule,ConfigService } from '@nestjs/config';

@Module({
  imports: [UsersModule,ProcessorModule,ReportsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
