import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User, CreateUserDto, UpdateUserDto, UserWithRoles } from './user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users with their roles' })
  @ApiResponse({ status: 200, description: 'List of all users with roles' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID with roles' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User details with roles' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }

  @Patch(':id/roles')
  @ApiOperation({ summary: 'Add a role to a user' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiBody({ schema: { type: 'object', properties: { role_id: { type: 'number' } } } })
  @ApiResponse({ status: 200, description: 'Role added to user' })
  @ApiResponse({ status: 404, description: 'User or role not found' })
  async addRole(@Param('id') userId: string, @Body() body: { role_id: number }): Promise<void> {
    return this.usersService.addRole(+userId, body.role_id);
  }

  @Delete(':id/roles/:roleId')
  @ApiOperation({ summary: 'Remove a role from a user' })
  @ApiParam({ name: 'id', type: 'number', description: 'User ID' })
  @ApiParam({ name: 'roleId', type: 'number', description: 'Role ID' })
  @ApiResponse({ status: 200, description: 'Role removed from user' })
  async removeRole(@Param('id') userId: string, @Param('roleId') roleId: string): Promise<void> {
    return this.usersService.removeRole(+userId, +roleId);
  }
}
