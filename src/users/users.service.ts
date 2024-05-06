import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';

import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";
import { MailerService } from '@nestjs-modules/mailer';
import { ReportsService } from '../reports/reports.service'; 



@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly mailService: MailerService,
        private readonly reportsService: ReportsService, 
    ) {}
    
    // Retrieve a user by userId
    async getUserById(userId: string): Promise<User> {
        return this.usersRepository.findOne({ userId })
    }

    // Create a new user if not exists, otherwise return the existing user
    async createUser(email: string): Promise<User> {
        const user = await this.usersRepository.findOne({ email });

        if (user) {
            return {
                userId:user.userId,
                email,
                reports: user.reports
            }
        }
        return this.usersRepository.create({
            userId: uuidv4(),
            email,
            reports: []
        })
    }

    // Update a user's reports
    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        // Find the user by userId
        const user = await this.usersRepository.findOne({ userId });

        if (!user) {
            throw new Error(`User with userId '${userId}' not found`);
        }

        // Append the reports from updateUserDto to the existing reports array
        user.reports.push(...updateUserDto.reports);

        try{
            // If there are new reports and user has an email, send an email notification
            if (updateUserDto.reports.length > 0 && user.email) {
                await this.mailService.sendMail({
                    from: 'Nour Mtawea <info@nourmtawea.info>',
                    to: `${user.email}`,
                    subject: `Report is ready`,
                    text: `Your report is ready with the uuid: ${updateUserDto.reports[0]} `,
                });
            }
        } catch(error) {
            console.log(error);
        }

        // Save the updated user
        return this.usersRepository.findOneAndUpdate({ userId }, user);
    }

    // Send a report to the user's email
    async sendReportToEmail( reportId: string) {

        try{
            const report = await this.reportsService.getReportById(reportId);

            if (!report) {
                throw new Error(`Report with reportId '${reportId}' not found`);
            }

            const user = await this.usersRepository.findOne({ userId: report.userId});

            let wordsList = ``;

            (report.words as [string, number][]).forEach(([word, count]) => {
                wordsList += `${word}: #${count} times\n`;
            });

            // If there are new reports and user has an email, send an email notification
            if (report) {
                await this.mailService.sendMail({
                    from: 'Nour Mtawea <info@nourmtawea.info>',
                    to: `${user.email}`,
                    subject: `Your Requested Report`,
                    text: `Your report is here:
                        ${wordsList}
                    `,
                });
            }
        } catch(error) {
            console.log(error);
        }

    }
}
