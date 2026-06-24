import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Knex } from 'knex';
import { FarmerProfile, CreateFarmerProfileDto, UpdateFarmerProfileDto, FarmerProfileWithUser } from './farmer-profile.entity';

@Injectable()
export class FarmerProfilesService {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async findAll(): Promise<FarmerProfileWithUser[]> {
    const profiles = await this.knex('farmer_profiles').select('*');
    return Promise.all(
      profiles.map(async (profile) => ({
        ...profile,
        user: await this.getUserForProfile(profile.user_id),
      })),
    );
  }

  async findOne(id: number): Promise<FarmerProfileWithUser> {
    const profile = await this.knex('farmer_profiles').where({ id }).first();
    if (!profile) {
      throw new NotFoundException(`Farmer profile with ID ${id} not found`);
    }
    return {
      ...profile,
      user: await this.getUserForProfile(profile.user_id),
    };
  }

  async findByFarmerId(farmerId: string): Promise<FarmerProfileWithUser | null> {
    const profile = await this.knex('farmer_profiles').where({ farmer_id: farmerId }).first();
    if (!profile) return null;
    return {
      ...profile,
      user: await this.getUserForProfile(profile.user_id),
    };
  }

  async findByUserId(userId: number): Promise<FarmerProfileWithUser | null> {
    const profile = await this.knex('farmer_profiles').where({ user_id: userId }).first();
    if (!profile) return null;
    return {
      ...profile,
      user: await this.getUserForProfile(profile.user_id),
    };
  }

  async create(createFarmerProfileDto: CreateFarmerProfileDto): Promise<FarmerProfileWithUser> {
    const existingProfile = await this.findByUserId(createFarmerProfileDto.user_id);
    if (existingProfile) {
      throw new ConflictException(`Farmer profile for user ${createFarmerProfileDto.user_id} already exists`);
    }
    const [id] = await this.knex('farmer_profiles').insert({
      ...createFarmerProfileDto,
      created_at: this.knex.fn.now(),
      updated_at: this.knex.fn.now(),
    });
    return this.findOne(id);
  }

  async update(id: number, updateFarmerProfileDto: UpdateFarmerProfileDto): Promise<FarmerProfileWithUser> {
    const profile = await this.knex('farmer_profiles').where({ id }).first();
    if (!profile) {
      throw new NotFoundException(`Farmer profile with ID ${id} not found`);
    }
    await this.knex('farmer_profiles').where({ id }).update({
      ...updateFarmerProfileDto,
      updated_at: this.knex.fn.now(),
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.knex('farmer_profiles').where({ id }).first();
    if (!profile) {
      throw new NotFoundException(`Farmer profile with ID ${id} not found`);
    }
    await this.knex('farmer_profiles').where({ id }).del();
  }

  private async getUserForProfile(userId: number) {
    return this.knex('users')
      .where({ id: userId })
      .first('id', 'first_name', 'last_name', 'email', 'phone');
  }
}
