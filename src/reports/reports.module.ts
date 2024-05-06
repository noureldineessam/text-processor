import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Report, ReportSchema } from "./schemas/report.schema";
import { ReportsController } from "./reports.controller";
import { ReportsRepository } from "./reports.repository";
import { ReportsService } from "./reports.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }])],
    controllers: [ReportsController],
    providers: [ReportsService, ReportsRepository],
    exports: [ReportsService] // Export ReportsService if needed by other modules
})
export class ReportsModule {}