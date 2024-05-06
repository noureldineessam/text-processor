import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';

import { Report } from "./schemas/report.schema";
import { ReportsRepository } from "./reports.repository";

@Injectable()
export class ReportsService {
    constructor(private readonly reportsRepository: ReportsRepository) {}
    
    async getReportById(reportId: string): Promise<Report> {
        return this.reportsRepository.findOne({ reportId }); 
    }

    async createReport(userId: string,words): Promise<Report> {
        const reportId = uuidv4();

        try {
            const report = await this.reportsRepository.create({
                reportId,
                userId,
                words
            });
            console.log('Report created:', report);
            return report;
        } catch (error) {
            console.error('Error creating report:', error);
            throw error; // Rethrow the error to propagate it
        }
    }
}
