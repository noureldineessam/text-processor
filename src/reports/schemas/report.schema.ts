import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ReportDocument = Report & Document;

@Schema()
export class Report {
    @Prop()
    reportId: string;

    @Prop()
    userId: string;
    
    @Prop()
    words: [];
} 

export const ReportSchema = SchemaFactory.createForClass(Report);