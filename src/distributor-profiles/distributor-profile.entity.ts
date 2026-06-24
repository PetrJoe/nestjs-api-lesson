export interface DistributorProfile {
  id: number;
  user_id: number;
  distributor_id: string;
  company_name: string;
  company_registration_number: string | null;
  contact_person: string;
  contact_phone: string;
  business_address: string;
  business_city: string;
  business_state: string;
  business_country: string;
  warehouse_address: string | null;
  warehouse_city: string | null;
  warehouse_state: string | null;
  storage_capacity_tons: number | null;
  preferred_products: string | null;
  credit_limit: number;
  current_balance: number;
  is_active: boolean;
  is_verified: boolean;
  verification_date: string | null;
  created_at: string;
  updated_at: string;
}

export class CreateDistributorProfileDto {
  user_id: number;
  distributor_id: string;
  company_name: string;
  company_registration_number?: string;
  contact_person: string;
  contact_phone: string;
  business_address: string;
  business_city: string;
  business_state: string;
  business_country?: string;
  warehouse_address?: string;
  warehouse_city?: string;
  warehouse_state?: string;
  storage_capacity_tons?: number;
  preferred_products?: string;
  credit_limit?: number;
  current_balance?: number;
}

export class UpdateDistributorProfileDto {
  distributor_id?: string;
  company_name?: string;
  company_registration_number?: string;
  contact_person?: string;
  contact_phone?: string;
  business_address?: string;
  business_city?: string;
  business_state?: string;
  business_country?: string;
  warehouse_address?: string;
  warehouse_city?: string;
  warehouse_state?: string;
  storage_capacity_tons?: number;
  preferred_products?: string;
  credit_limit?: number;
  current_balance?: number;
  is_active?: boolean;
  is_verified?: boolean;
  verification_date?: string;
}

export class DistributorProfileWithUser implements DistributorProfile {
  id: number;
  user_id: number;
  distributor_id: string;
  company_name: string;
  company_registration_number: string | null;
  contact_person: string;
  contact_phone: string;
  business_address: string;
  business_city: string;
  business_state: string;
  business_country: string;
  warehouse_address: string | null;
  warehouse_city: string | null;
  warehouse_state: string | null;
  storage_capacity_tons: number | null;
  preferred_products: string | null;
  credit_limit: number;
  current_balance: number;
  is_active: boolean;
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
