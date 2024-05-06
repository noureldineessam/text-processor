import { ApiProperty } from '@nestjs/swagger';

export class ProcessTextEntity {
  @ApiProperty({
    example: ['this',4],
    type: [String],
    isArray: true,
    description: 'The most frequent word and its frequency.'
  })
  data: string[];

  @ApiProperty({
    example: 'Text has been processed successfully',
    type: String,
  })
  message: string;
}