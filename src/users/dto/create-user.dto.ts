import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString, IsEmail } from 'class-validator'; // Corrected import

export class CreateUserDto {
    @ApiProperty({
        example: 'user@example.com', // Updated example to an email format
        type: String,
    })
    @IsNotEmpty()
    @IsEmail() // Corrected decorator
    email: string;
}