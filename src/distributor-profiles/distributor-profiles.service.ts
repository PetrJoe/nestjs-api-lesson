import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Knex } from 'knex';
import { DistributorProfile, CreateDistributorProfileDto, UpdateDistributorProfileDto, DistributorProfileWithUser } from './distributor-profile.entity';

@Injectable()
export class DistributorProfilesService {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async findAll(): Promise<DistributorProfileWithUser[]> {
    const profiles = await this.knex('distributor_profiles').select('*');
    return Promise.all(
      profiles.map(async (profile) => ({
        ...profile,
        user: await this.getUserForProfile(profile.user_id),
      })),
    );
  }

  async findOne(id: number): Promise<DistributorProfileWithUser> {
    const profile = await this.knex('distributor_profiles').where({ id }).first();
    if (!profile) {
      throw new NotFoundException(`Distributor profile with ID ${id} not found`);
    }
    return {
      ...profile,
      user: await this.getUserForProfile(profile.user_id),
    };
  }

  async findByDistributorId(distributorId: string): Promise<DistributorProfileWithUser | null> {
    const profile = await this.knex('distributor_profiles').where({ distributor_id: distributorId }).first();
    if (!profile) return null;
    return {
      ...profile,
      user: await this.getUserForProfile(profile.user_id),
    };
  }

  async findByUserId(userId: number): Promise<DistributorProfileWithUser | null> {
    const profile = await this.knex('distributor_profiles').where({ user_id: userId }).first();
    if (!profile) return null;
    return {
      ...profile,
      user: await this.getUserForProfile(profile.user_id),
    };
  }

  async create(createDistributorProfileDto: CreateDistributorProfileDto): Promise<DistributorProfileWithUser> {
    const existingProfile = await this.findByUserId(createDistributorProfileDto.user_id);
    if (existingProfile) {
      throw new ConflictException(`Distributor profile for user ${createDistributorProfileDto.user_id} already exists`);
    }
    const [id] = await this.knex('distributor_profiles').insert({
      ...createDistributorProfileDto,
      credit_limit: createDistributorProfileDto.credit_limit || 0,
      current_balance: createDistributorProfileDto.current_balance || 0,
      is_active: true,
      created_at: this.knex.fn.now(),
      updated_at: this.knex.fn.now(),
    });
    return this.findOne(id);
  }

  async update(id: number, updateDistributorProfileDto: UpdateDistributorProfileDto): Promise<DistributorProfileWithUser> {
    const profile = await this.knex('distributor_profiles').where({ id }).first();
    if (!profile) {
      throw new NotFoundException(`Distributor profile with ID ${id} not found`);
    }
    await this.knex('distributor_profiles').where({ id }).update({
      ...updateDistributorProfileDto,
      updated_at: this.knex.fn.now(),
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const profile = await this.knex('distributor_profiles').where({ id }).first();
    if (!profile) {
      throw new NotFoundException(`Distributor profile with ID ${id} not found`);
    }
    await this.knex('distributor_profiles').where({ id }).del();
  }

  private async getUserForProfile(userId: number) {
    return this.knex('users')
      .where({ id: userId })
      .first('id', 'first_name', 'last_name', 'email', 'phone');
  }
}
