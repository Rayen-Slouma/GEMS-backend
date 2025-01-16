import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from '../auth/gaurds/auth.guard'; // Correction du typo : 'gaurds' à 'guards'

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Route publique pour récupérer un utilisateur par ID
  @ApiOperation({ summary: 'Get user details by ID (public)' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @Get('public/:id')
  async getUserByIdPublic(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async getAllUsers() {
    return this.usersService.findAll(); // Méthode findAll dans le service
  }

  @ApiOperation({ summary: 'Get user details by ID (protected)' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @Get(':id')
  @UseGuards(AuthGuard) // Route protégée par un token JWT
  async getUserById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Update user profile' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @Patch(':id')
  @UseGuards(AuthGuard) // Route protégée par un token JWT
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.usersService.deleteUser(id);
  }
}
