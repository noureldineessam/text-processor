import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateReportDto } from './dto/reports.dto';

import { Report } from './schemas/report.schema';
import { ReportsService } from './reports.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reports-managment')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get(':reportId')
  async getUser(@Param('reportId') reportId: string): Promise<Report> {
    return this.reportsService.getReportById(reportId);
  }


  @Post()
  async createReport(@Body() CreateReportDto: CreateReportDto): Promise<Report> {
      return this.reportsService.createReport(CreateReportDto.userId,CreateReportDto.words)
  }

}