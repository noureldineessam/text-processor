import { Injectable } from '@nestjs/common';
import { ProcessTextPayload } from './dto/processor.dto';
import { commonWords } from './utilities';
import { UsersService } from '../users/users.service'; 
import { ReportsService } from '../reports/reports.service'; 



@Injectable()
export class ProcessorService {
  constructor(
    private readonly usersService: UsersService,
    private readonly reportsService: ReportsService, 
  ) {}

  async processTextService(dto: ProcessTextPayload,){
    const {content,ignoredWords,numberOfWords,userId} = dto;
    const wordFreq: { [key: string]: number } = {}; // Define wordFreq as an object with string keys and number values
    const cleanText = content.replace(/[^a-zA-Z\s]/g, ''); // Remove special characters and numbers
    let words = cleanText.toLowerCase().split(/\s+/); // Split the text into words and convert to lowercase

    let ignoredWordsArray: string[] = ignoredWords;

    if (ignoredWords.length === 0 || (ignoredWords.length === 1 && ignoredWords[0] === "")) {
      ignoredWordsArray = commonWords
    }

    words = words.filter(word => !ignoredWordsArray.includes(word));

    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    const sortedWords = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, numberOfWords);

    const data = sortedWords.map(([word, freq]) => [word, freq]);

    // Extracting user ID and reports from data and then...
    // Update user reports
    try {
      let reportGenerated =await this.reportsService.createReport(userId,data)
      const reports = [reportGenerated.reportId]

      await this.usersService.updateUser(userId, { reports });


    } catch (error) {
      console.error('Failed to update user reports:', error);
      // Handle error appropriately
    }
  
    return {data, message: 'Text has been processed successfully'};
  }
}
 