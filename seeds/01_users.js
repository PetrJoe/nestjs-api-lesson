exports.seed = async function (knex) {
  // First get role IDs
  const roles = await knex('roles').select('id', 'name');
  const roleMap = {};
  roles.forEach(r => roleMap[r.name] = r.id);

  // Delete existing data
  await knex('user_roles').del();
  await knex('farmer_profiles').del();
  await knex('distributor_profiles').del();
  await knex('users').del();

  // Insert users
  const users = await knex('users').insert([
    {
      email: 'superadmin@hfap.com',
      password_hash: '$2a$10$examplehashedpassword1',
      first_name: 'Super',
      last_name: 'Admin',
      phone: '+2348000000001',
      is_active: true,
      is_verified: true,
      email_verified_at: knex.fn.now(),
    },
    {
      email: 'admin@hfap.com',
      password_hash: '$2a$10$examplehashedpassword2',
      first_name: 'System',
      last_name: 'Admin',
      phone: '+2348000000002',
      is_active: true,
      is_verified: true,
      email_verified_at: knex.fn.now(),
    },
    {
      email: 'farmer1@hfap.com',
      password_hash: '$2a$10$examplehashedpassword3',
      first_name: 'John',
      last_name: 'Ade',
      phone: '+2348000000003',
      address: 'Ikeja, Lagos',
      city: 'Lagos',
      state: 'Lagos',
      is_active: true,
      is_verified: true,
      email_verified_at: knex.fn.now(),
    },
    {
      email: 'distributor1@hfap.com',
      password_hash: '$2a$10$examplehashedpassword4',
      first_name: 'ABC',
      last_name: 'Feeds',
      phone: '+2348000000004',
      address: '1 Industrial Layout, Ibadan',
      city: 'Ibadan',
      state: 'Oyo',
      is_active: true,
      is_verified: true,
      email_verified_at: knex.fn.now(),
    },
    {
      email: 'manager@hfap.com',
      password_hash: '$2a$10$examplehashedpassword5',
      first_name: 'Operations',
      last_name: 'Manager',
      phone: '+2348000000005',
      is_active: true,
      is_verified: true,
      email_verified_at: knex.fn.now(),
    },
  ]).returning('id');

  // Insert user roles
  const userRoles = [
    { user_id: users[0].id, role_id: roleMap.super_admin },
    { user_id: users[1].id, role_id: roleMap.admin },
    { user_id: users[2].id, role_id: roleMap.farmer },
    { user_id: users[3].id, role_id: roleMap.distributor },
    { user_id: users[4].id, role_id: roleMap.manager },
  ];
  await knex('user_roles').insert(userRoles);

  // Insert farmer profiles
  await knex('farmer_profiles').insert([
    {
      user_id: users[2].id,
      farmer_id: 'HFAP-FARMER-001',
      cooperative_name: 'Ikeja Farmers Cooperative',
      cooperative_id: 'COOP-001',
      farm_name: 'Ade Farms',
      farm_address: 'Plot 123, Agric Zone, Ikeja',
      farm_city: 'Lagos',
      farm_state: 'Lagos',
      farm_lga: 'Ikeja',
      farm_size_hectares: 5.5,
      gps_coordinates: '6.5948,3.3284',
      bank_name: 'First Bank',
      bank_account_name: 'John Ade',
      bank_account_number: '1234567890',
      cassava_variety: 'TMS 30572',
      expected_yield_per_hectare: 25.0,
      is_verified: true,
      verification_date: knex.fn.now(),
    },
  ]);

  // Insert distributor profiles
  await knex('distributor_profiles').insert([
    {
      user_id: users[3].id,
      distributor_id: 'HFAP-DIST-001',
      company_name: 'ABC Feeds Limited',
      company_registration_number: 'RC1234567',
      contact_person: 'ABC Feeds',
      contact_phone: '+2348000000004',
      business_address: '1 Industrial Layout, Ibadan',
      business_city: 'Ibadan',
      business_state: 'Oyo',
      warehouse_address: 'Plot 456, Warehouse District, Ibadan',
      warehouse_city: 'Ibadan',
      warehouse_state: 'Oyo',
      storage_capacity_tons: 500.0,
      preferred_products: 'cassava_offal,industrial_starch',
      credit_limit: 1000000.0,
      current_balance: 0.0,
      is_active: true,
      is_verified: true,
      verification_date: knex.fn.now(),
    },
  ]);
};
