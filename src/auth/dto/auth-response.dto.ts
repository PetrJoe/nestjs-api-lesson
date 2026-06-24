export class AuthResponseDto {
  token: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    roles: { id: number; name: string; description: string | null }[];
  };
}
