export interface User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string;
  avatar_url: string | null;
  is_active: boolean;
  is_verified: boolean;
  email_verified_at: string | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export class CreateUserDto {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  avatar_url?: string;
}

export class UpdateUserDto {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  avatar_url?: string;
  is_active?: boolean;
  is_verified?: boolean;
}

export class UserWithRoles implements User {
  id: number;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string;
  avatar_url: string | null;
  is_active: boolean;
  is_verified: boolean;
  email_verified_at: string | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
  roles?: { id: number; name: string; description: string | null }[];
}
