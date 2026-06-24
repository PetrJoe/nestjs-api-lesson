import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Knex } from 'knex';
import { Role, CreateRoleDto, UpdateRoleDto } from './role.entity';

@Injectable()
export class RolesService {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async findAll(): Promise<Role[]> {
    return this.knex('roles').select('*');
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.knex('roles').where({ id }).first();
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async findByName(name: string): Promise<Role | null> {
    return this.knex('roles').where({ name }).first();
  }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.findByName(createRoleDto.name);
    if (existingRole) {
      throw new ConflictException(`Role with name '${createRoleDto.name}' already exists`);
    }
    const [id] = await this.knex('roles').insert({
      ...createRoleDto,
      created_at: this.knex.fn.now(),
      updated_at: this.knex.fn.now(),
    });
    return this.findOne(id);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    if (updateRoleDto.name) {
      const existingRole = await this.findByName(updateRoleDto.name);
      if (existingRole && existingRole.id !== id) {
        throw new ConflictException(`Role with name '${updateRoleDto.name}' already exists`);
      }
    }
    await this.knex('roles').where({ id }).update({
      ...updateRoleDto,
      updated_at: this.knex.fn.now(),
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    await this.knex('roles').where({ id }).del();
  }
}
