import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { Knex } from 'knex';
import { User, CreateUserDto, UpdateUserDto, UserWithRoles } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async findAll(): Promise<UserWithRoles[]> {
    const users = await this.knex('users').select('*');
    const usersWithRoles = await Promise.all(
      users.map(async (user) => ({
        ...user,
        roles: await this.getUserRoles(user.id),
      })),
    );
    return usersWithRoles;
  }

  async findOne(id: number): Promise<UserWithRoles> {
    const user = await this.knex('users').where({ id }).first();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      ...user,
      roles: await this.getUserRoles(id),
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.knex('users').where({ email }).first();
  }

  async create(createUserDto: CreateUserDto): Promise<UserWithRoles> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException(`User with email '${createUserDto.email}' already exists`);
    }
    const [id] = await this.knex('users').insert({
      email: createUserDto.email,
      password_hash: createUserDto.password,
      first_name: createUserDto.first_name,
      last_name: createUserDto.last_name,
      phone: createUserDto.phone,
      address: createUserDto.address,
      city: createUserDto.city,
      state: createUserDto.state,
      country: createUserDto.country || 'Nigeria',
      avatar_url: createUserDto.avatar_url,
      created_at: this.knex.fn.now(),
      updated_at: this.knex.fn.now(),
    });
    return this.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserWithRoles> {
    if (updateUserDto.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException(`User with email '${updateUserDto.email}' already exists`);
      }
    }
    await this.knex('users').where({ id }).update({
      email: updateUserDto.email,
      first_name: updateUserDto.first_name,
      last_name: updateUserDto.last_name,
      phone: updateUserDto.phone,
      address: updateUserDto.address,
      city: updateUserDto.city,
      state: updateUserDto.state,
      country: updateUserDto.country,
      avatar_url: updateUserDto.avatar_url,
      is_active: updateUserDto.is_active,
      is_verified: updateUserDto.is_verified,
      updated_at: this.knex.fn.now(),
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.knex('users').where({ id }).first();
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.knex('users').where({ id }).del();
  }

  async addRole(userId: number, roleId: number): Promise<void> {
    const user = await this.knex('users').where({ id: userId }).first();
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const role = await this.knex('roles').where({ id: roleId }).first();
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    await this.knex('user_roles').insert({ user_id: userId, role_id: roleId });
  }

  async removeRole(userId: number, roleId: number): Promise<void> {
    await this.knex('user_roles').where({ user_id: userId, role_id: roleId }).del();
  }

  async getUserRoles(userId: number) {
    const userRoles = await this.knex('user_roles')
      .where({ user_id: userId })
      .select('role_id');
    const roleIds = userRoles.map((ur) => ur.role_id);
    if (roleIds.length === 0) return [];
    return this.knex('roles').whereIn('id', roleIds).select('id', 'name', 'description');
  }

  async hasRole(userId: number, roleName: string): Promise<boolean> {
    const result = await this.knex('user_roles')
      .join('roles', 'user_roles.role_id', 'roles.id')
      .where({ 'user_roles.user_id': userId, 'roles.name': roleName })
      .first();
    return !!result;
  }
}
