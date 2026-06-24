export interface Role {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export class CreateRoleDto {
  name: string;
  description?: string;
}

export class UpdateRoleDto {
  name?: string;
  description?: string;
}
