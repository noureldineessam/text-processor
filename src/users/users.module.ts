import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { ReportsModule } from "../reports/reports.module";



@Module({
    imports: [
        ReportsModule,
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
                },
            },
        })
    ],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository],
    exports: [UsersService] // Export UsersService if needed by other modules
})
export class UsersModule {}