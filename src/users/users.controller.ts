import { Controller, Get, Param, Post, Body, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('users-management')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Post('send-report')
  async sendReportToEmail(@Body('reportId') reportId: string): Promise<void> {
    return this.usersService.sendReportToEmail(reportId);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get User by ID', description: 'Get user details by user ID.' })
  @ApiParam({ name: 'userId', description: 'The ID of the user to retrieve.' })
  @ApiOkResponse({ 
    description: 'User details.', 
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: '123' },
        email: { type: 'string', example: 'example@example.com' },
        reports: { type: 'array', items: { type: 'string' }, example: [] }
      }
    }
  })
  async getUser(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create User', description: 'Create a new user with the provided email.' })
  @ApiBody({ type: CreateUserDto, description: 'Email of the user to create.' })
  @ApiOkResponse({ 
    description: 'The newly created user.', 
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: '123' },
        email: { type: 'string', example: 'example@example.com' },
        reports: { type: 'array', items: { type: 'string' }, example: [] }
      }
    }
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto.email);
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update User reports', description: 'Update user reports.' })
  @ApiParam({ name: 'userId', description: 'The ID of the user to update.' })
  @ApiBody({ type: UpdateUserDto, description: 'New reports to update for the user.' })
  @ApiOkResponse({ 
    description: 'Updated user reports.', 
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: '123' },
        email: { type: 'string', example: 'example@example.com' },
        reports: { type: 'array', items: { type: 'string' }, example: [] }
      }
    }
  })
  async updateUser(
    @Param('userId') userId: string, 
    @Body() updateUserDto: UpdateUserDto
  ): Promise<User> {
    const updatedUser = await this.usersService.updateUser(userId, updateUserDto);
    if (!updatedUser) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return updatedUser;
  }
}
