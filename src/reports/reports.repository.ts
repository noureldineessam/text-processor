import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { Report, ReportDocument } from "./schemas/report.schema";

@Injectable()
export class ReportsRepository {
    constructor(@InjectModel(Report.name) private reportModel: Model<ReportDocument>) {}

    async findOne(reportFilterQuery: FilterQuery<Report>): Promise<Report> {
        return this.reportModel.findOne(reportFilterQuery);
    }

    async create(report: Report): Promise<Report> {
        const newReport = new this.reportModel(report);
        return newReport.save()
    }

}