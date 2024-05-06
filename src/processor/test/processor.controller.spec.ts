import { Test, TestingModule } from '@nestjs/testing';
import { ProcessorController } from '../processor.controller';
import { ProcessorService } from '../processor.service';
import { UsersService } from '../../users/users.service'; // Import UsersService
import * as fs from 'fs';
import * as path from 'path';
import { commonWords } from '.././utilities';
import { User } from '../../users/schemas/user.schema'; // Import the User class
import { Report } from '../../reports/schemas/report.schema'; // Import the Report class
import { ReportsService } from '../../reports/reports.service'; // Import ReportsService
import { v4 as uuidv4 } from 'uuid';


// Mock UsersService
class MockUsersService {
  async updateUser(userId: string, userUpdates: any): Promise<User> {
    // Provide a mock implementation of the updateUser method
    return { userId, ...userUpdates };
  }
}

// Mock ReportsService
class MockReportsService {
  async createReport(userId: string, userUpdates: any): Promise<Report> {
    // Generate a unique report ID
    const reportId = uuidv4();
    // Combine userId, reportId, and any other properties in the userUpdates object
    const report: Report = {
      reportId,
      userId,
      ...userUpdates,
    };
    // Return the complete report object
    return report;
  }
}
describe('ProcessorController', () => {
  let processorController: ProcessorController;
  let processorService: ProcessorService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProcessorController],
      providers: [
        ProcessorService,
        {
          provide: UsersService, // Provide UsersService token
          useClass: MockUsersService, // Use the mock class
        },
        {
          provide: ReportsService, // Provide ReportsService token
          useClass: MockReportsService, // Use the mock class
        }
      ],
    }).compile();

    processorController = app.get<ProcessorController>(ProcessorController);
    processorService = app.get<ProcessorService>(ProcessorService);
  });


  describe('processText', () => {
    const filePath = path.join(__dirname, '.', 'books', 'test.txt');
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });
    const ignoredWordsArray = commonWords

    it('should return the most frequent words and their frequencies when numberOfWords is set to 2',async () => {
      // Example request body
      const requestBody = {
        content: fileContent,
        ignoredWords: ignoredWordsArray,
        numberOfWords: 2,
        userId: '12345'
      };

      // Mock the service method if it's used in the controller method
      const expectedOutput = [['proficy', 25],['and', 19]]; // Expected output when numberOfWords is set to 2

      // Assert the expected result
      expect((await processorController.processText(requestBody)).data).toEqual(expectedOutput);
    });

    it('should return the most frequent word and its frequency when numberOfWords is set to 1',async  () => {
      // Example request body
      const requestBody = {
        content: fileContent,
        ignoredWords: ignoredWordsArray,
        numberOfWords: 1,
        userId: '12345'
      };

      // Mock the service method if it's used in the controller method
      const expectedOutput = [['proficy', 25]]; // Expected output when numberOfWords is set to 1

      // Assert the expected result
      expect((await processorController.processText(requestBody)).data).toEqual(expectedOutput);
    });
  });
});
