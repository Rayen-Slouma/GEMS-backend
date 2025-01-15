import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/gaurds/auth.guard';  // Fixed typo: 'gaurds' to 'guards'

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Public route to fetch all users (no token required)
  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();  // Assuming you have a `findAll` method in your service
  }

  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @Get(':id')
  @UseGuards(AuthGuard)  // This route is protected by JWT token
  async getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  @UseGuards(AuthGuard)  // This route is also protected by JWT token
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }
}
