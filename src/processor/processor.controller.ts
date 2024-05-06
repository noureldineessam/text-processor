import { Controller, Post, Body, UsePipes, HttpCode, HttpStatus} from '@nestjs/common';
import { ProcessorService } from './processor.service';
import {  ApiOperation, ApiTags, ApiBody, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ProcessTextPayload } from './dto/processor.dto'; // Importing the payload DTO
import { ProcessTextEntity } from './processor.entity';


@ApiTags('text-processing')
@Controller('processor')
export class ProcessorController {
  constructor(private readonly ProcessorService: ProcessorService) {}

  @Post()
  @ApiOperation({ summary: 'Process Text', description: 'Process text from a file and return the most frequent word and its frequency.' })
  @ApiBody({ type: ProcessTextPayload, description: 'The text content and list of words to ignore during processing.' })
  @ApiOkResponse({ description: 'The most frequent word and its frequency.', type: ProcessTextEntity })
  @HttpCode(HttpStatus.OK)
  processText(@Body() dto: ProcessTextPayload) {
    return this.ProcessorService.processTextService(dto);
  }
}