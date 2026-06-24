exports.seed = function (knex) {
  return knex('roles')
    .del()
    .then(function () {
      return knex('roles').insert([
        { name: 'super_admin', description: 'Full access to all features and data' },
        { name: 'admin', description: 'Administrative access with most permissions' },
        { name: 'manager', description: 'Manager level access for operations' },
        { name: 'farmer', description: 'Farmer/Outgrower access' },
        { name: 'distributor', description: 'Distributor/B2B customer access' },
        { name: 'staff', description: 'Regular staff member' },
      ]);
    });
};
