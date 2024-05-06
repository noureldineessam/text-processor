import { Module } from '@nestjs/common';
import { ProcessorController } from './processor.controller';
import { ProcessorService } from './processor.service';
import { UsersModule } from '../users/users.module'; 
import { ReportsModule } from '../reports/reports.module'; 


@Module({
  imports: [UsersModule,ReportsModule],
  controllers: [ProcessorController],
  providers: [ProcessorService],
})
export class ProcessorModule {}
