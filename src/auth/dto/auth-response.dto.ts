import { ApiProperty } from '@nestjs/swagger';

class AuthUserDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  id: number;

  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  last_name: string;

  @ApiProperty({
    example: [{ id: 1, name: 'farmer', description: 'Farmer/Outgrower access' }],
    description: 'User roles',
  })
  roles: { id: number; name: string; description: string | null }[];
}

export class AuthResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...', description: 'JWT access token' })
  token: string;

  @ApiProperty({ type: AuthUserDto, description: 'Authenticated user details' })
  user: AuthUserDto;
}
