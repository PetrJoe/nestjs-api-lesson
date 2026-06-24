import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  email: string;

  @ApiProperty({ example: 'strongPassword123', description: 'User password (min 8 characters)' })
  password: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  last_name: string;

  @ApiPropertyOptional({ example: '+2348012345678', description: 'Phone number' })
  phone?: string;

  @ApiPropertyOptional({ example: '123 Main Street', description: 'Physical address' })
  address?: string;

  @ApiPropertyOptional({ example: 'Lagos', description: 'City' })
  city?: string;

  @ApiPropertyOptional({ example: 'Lagos', description: 'State' })
  state?: string;

  @ApiPropertyOptional({ example: 'Nigeria', description: 'Country' })
  country?: string;
}
