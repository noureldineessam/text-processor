import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator'; 

export class CreateReportDto {
    @ApiProperty({
        example: '12345', 
        type: String,
    })
    @IsNotEmpty()
    @IsString() 
    userId: string;

    @ApiProperty({
        example: '111-222-333-444', 
        type: String,
    })
    @IsNotEmpty()
    @IsString() 
    reportId: string;

    @ApiProperty({
        example: '111-222-333-444', 
        type: String,
    })
    @IsNotEmpty()
    @IsArray() 
    words: []; 
}