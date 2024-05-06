import { ApiProperty } from '@nestjs/swagger';
import {  IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProcessTextPayload {
  @ApiProperty({
    example: 'This is a text to be tested.  This is a test. This is a test.',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    example: ['a','the'],
    type: [String],
    isArray: true,
  })
  @IsNotEmpty()
  @IsArray()
  ignoredWords: string[];

  @ApiProperty({
    example: 2,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  numberOfWords: number

  @ApiProperty({
    example: '01da251c-7814-463e-97c7-86859bea3c9c',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userId: string
}