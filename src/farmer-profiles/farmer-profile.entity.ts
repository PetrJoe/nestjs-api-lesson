export interface FarmerProfile {
  id: number;
  user_id: number;
  farmer_id: string;
  cooperative_name: string | null;
  cooperative_id: string | null;
  farm_name: string;
  farm_address: string;
  farm_city: string;
  farm_state: string;
  farm_lga: string | null;
  farm_size_hectares: number | null;
  gps_coordinates: string | null;
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
  cassava_variety: string | null;
  expected_yield_per_hectare: number | null;
  is_verified: boolean;
  verification_date: string | null;
  created_at: string;
  updated_at: string;
}

export class CreateFarmerProfileDto {
  user_id: number;
  farmer_id: string;
  cooperative_name?: string;
  cooperative_id?: string;
  farm_name: string;
  farm_address: string;
  farm_city: string;
  farm_state: string;
  farm_lga?: string;
  farm_size_hectares?: number;
  gps_coordinates?: string;
  bank_name?: string;
  bank_account_name?: string;
  bank_account_number?: string;
  cassava_variety?: string;
  expected_yield_per_hectare?: number;
}

export class UpdateFarmerProfileDto {
  farmer_id?: string;
  cooperative_name?: string;
  cooperative_id?: string;
  farm_name?: string;
  farm_address?: string;
  farm_city?: string;
  farm_state?: string;
  farm_lga?: string;
  farm_size_hectares?: number;
  gps_coordinates?: string;
  bank_name?: string;
  bank_account_name?: string;
  bank_account_number?: string;
  cassava_variety?: string;
  expected_yield_per_hectare?: number;
  is_verified?: boolean;
  verification_date?: string;
}

export class FarmerProfileWithUser implements FarmerProfile {
  id: number;
  user_id: number;
  farmer_id: string;
  cooperative_name: string | null;
  cooperative_id: string | null;
  farm_name: string;
  farm_address: string;
  farm_city: string;
  farm_state: string;
  farm_lga: string | null;
  farm_size_hectares: number | null;
  gps_coordinates: string | null;
  bank_name: string | null;
  bank_account_name: string | null;
  bank_account_number: string | null;
  cassava_variety: string | null;
  expected_yield_per_hectare: number | null;
  is_verified: boolean;
  verification_date: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string | null;
  };
}
