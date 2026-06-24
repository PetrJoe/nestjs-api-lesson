import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { FarmerProfilesService } from './farmer-profiles.service';
import { FarmerProfile, CreateFarmerProfileDto, UpdateFarmerProfileDto, FarmerProfileWithUser } from './farmer-profile.entity';

@ApiTags('farmer-profiles')
@Controller('farmer-profiles')
export class FarmerProfilesController {
  constructor(private readonly farmerProfilesService: FarmerProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all farmer profiles' })
  @ApiResponse({ status: 200, description: 'List of all farmer profiles' })
  async findAll() {
    return this.farmerProfilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a farmer profile by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Farmer profile ID' })
  @ApiResponse({ status: 200, description: 'Farmer profile details' })
  @ApiResponse({ status: 404, description: 'Farmer profile not found' })
  async findOne(@Param('id') id: string) {
    return this.farmerProfilesService.findOne(+id);
  }

  @Get('farmer/:farmerId')
  @ApiOperation({ summary: 'Get a farmer profile by farmer ID' })
  @ApiParam({ name: 'farmerId', type: 'string', description: 'Farmer ID (HFAP internal ID)' })
  @ApiResponse({ status: 200, description: 'Farmer profile details' })
  @ApiResponse({ status: 404, description: 'Farmer profile not found' })
  async findByFarmerId(@Param('farmerId') farmerId: string) {
    const profile = await this.farmerProfilesService.findByFarmerId(farmerId);
    if (!profile) {
      throw new Error('Farmer profile not found');
    }
    return profile;
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get farmer profile by user ID' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Farmer profile details' })
  @ApiResponse({ status: 404, description: 'Farmer profile not found' })
  async findByUserId(@Param('userId') userId: string) {
    const profile = await this.farmerProfilesService.findByUserId(+userId);
    if (!profile) {
      throw new Error('Farmer profile not found');
    }
    return profile;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new farmer profile' })
  @ApiBody({ type: CreateFarmerProfileDto })
  @ApiResponse({ status: 201, description: 'Farmer profile created successfully' })
  @ApiResponse({ status: 409, description: 'Farmer profile already exists for this user' })
  async create(@Body() createFarmerProfileDto: CreateFarmerProfileDto) {
    return this.farmerProfilesService.create(createFarmerProfileDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a farmer profile' })
  @ApiParam({ name: 'id', type: 'number', description: 'Farmer profile ID' })
  @ApiBody({ type: UpdateFarmerProfileDto })
  @ApiResponse({ status: 200, description: 'Farmer profile updated successfully' })
  @ApiResponse({ status: 404, description: 'Farmer profile not found' })
  async update(@Param('id') id: string, @Body() updateFarmerProfileDto: UpdateFarmerProfileDto) {
    return this.farmerProfilesService.update(+id, updateFarmerProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a farmer profile' })
  @ApiParam({ name: 'id', type: 'number', description: 'Farmer profile ID' })
  @ApiResponse({ status: 200, description: 'Farmer profile deleted successfully' })
  @ApiResponse({ status: 404, description: 'Farmer profile not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.farmerProfilesService.remove(+id);
  }
}
