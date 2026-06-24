import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { DistributorProfilesService } from './distributor-profiles.service';
import { DistributorProfile, CreateDistributorProfileDto, UpdateDistributorProfileDto, DistributorProfileWithUser } from './distributor-profile.entity';

@ApiTags('distributor-profiles')
@Controller('distributor-profiles')
export class DistributorProfilesController {
  constructor(private readonly distributorProfilesService: DistributorProfilesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all distributor profiles' })
  @ApiResponse({ status: 200, description: 'List of all distributor profiles' })
  async findAll() {
    return this.distributorProfilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a distributor profile by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Distributor profile ID' })
  @ApiResponse({ status: 200, description: 'Distributor profile details' })
  @ApiResponse({ status: 404, description: 'Distributor profile not found' })
  async findOne(@Param('id') id: string) {
    return this.distributorProfilesService.findOne(+id);
  }

  @Get('distributor/:distributorId')
  @ApiOperation({ summary: 'Get a distributor profile by distributor ID' })
  @ApiParam({ name: 'distributorId', type: 'string', description: 'Distributor ID (HFAP internal ID)' })
  @ApiResponse({ status: 200, description: 'Distributor profile details' })
  @ApiResponse({ status: 404, description: 'Distributor profile not found' })
  async findByDistributorId(@Param('distributorId') distributorId: string) {
    const profile = await this.distributorProfilesService.findByDistributorId(distributorId);
    if (!profile) {
      throw new Error('Distributor profile not found');
    }
    return profile;
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get distributor profile by user ID' })
  @ApiParam({ name: 'userId', type: 'number', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Distributor profile details' })
  @ApiResponse({ status: 404, description: 'Distributor profile not found' })
  async findByUserId(@Param('userId') userId: string) {
    const profile = await this.distributorProfilesService.findByUserId(+userId);
    if (!profile) {
      throw new Error('Distributor profile not found');
    }
    return profile;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new distributor profile' })
  @ApiBody({ type: CreateDistributorProfileDto })
  @ApiResponse({ status: 201, description: 'Distributor profile created successfully' })
  @ApiResponse({ status: 409, description: 'Distributor profile already exists for this user' })
  async create(@Body() createDistributorProfileDto: CreateDistributorProfileDto) {
    return this.distributorProfilesService.create(createDistributorProfileDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a distributor profile' })
  @ApiParam({ name: 'id', type: 'number', description: 'Distributor profile ID' })
  @ApiBody({ type: UpdateDistributorProfileDto })
  @ApiResponse({ status: 200, description: 'Distributor profile updated successfully' })
  @ApiResponse({ status: 404, description: 'Distributor profile not found' })
  async update(@Param('id') id: string, @Body() updateDistributorProfileDto: UpdateDistributorProfileDto) {
    return this.distributorProfilesService.update(+id, updateDistributorProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a distributor profile' })
  @ApiParam({ name: 'id', type: 'number', description: 'Distributor profile ID' })
  @ApiResponse({ status: 200, description: 'Distributor profile deleted successfully' })
  @ApiResponse({ status: 404, description: 'Distributor profile not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.distributorProfilesService.remove(+id);
  }
}
