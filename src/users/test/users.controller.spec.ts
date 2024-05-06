import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';

// Mock UsersService
class MockUsersService {
  async getUserById(userId: string): Promise<User> {
    return {
      userId,
      email: 'test@example.com',
      reports: []
    };
  }

  async createUser(email: string): Promise<User> {
    return {
      userId: uuidv4(),
      email,
      reports: []
    };
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = {
      userId,
      email: 'test@example.com',
      reports: []
    };
    user.reports.push(...updateUserDto.reports);
    return user;
  }
}

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: MockUsersService;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: MockUsersService,
        },
        {
          provide: MailerService,
          useValue: {}, // Provide an empty object as a mock
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
    usersService = app.get<MockUsersService>(UsersService); // Get the instance of MockUsersService
  });

  describe('getUser', () => {
    it('should return a user by userId', async () => {
      const userId = '123';
      const result = await usersController.getUser(userId);
      expect(result.userId).toBe(userId);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
      };
      const result = await usersController.createUser(createUserDto);
      expect(result.userId).toBeDefined();
      expect(result.email).toBe(createUserDto.email);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = '123';
      const updateUserDto: UpdateUserDto = {
        reports: ['report1', 'report2'],
      };
      const result = await usersController.updateUser(userId, updateUserDto);
      expect(result.userId).toBe(userId);
      expect(result.reports).toEqual(updateUserDto.reports);
    });
  });
});
