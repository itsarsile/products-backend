/* eslint-disable camelcase */
const sql = require('../configs/db.config');

const selectAllCustomers = () => sql`SELECT * FROM customer`;
const selectCustomerById = (id) => sql`SELECT * FROM customer WHERE id=${id}`;
const insertCustomer = (customerData) => {
  const {
    email, password, name, contact, address,
  } = customerData;
  return sql`
    INSERT INTO customer (email, password, name, contact, address)
    VALUES (${email}, ${password}, ${name}, ${contact}, ${address})`;
};

const updateCustomer = (customerId, customerData) => {
  const {
    email, password, name, contact, address,
  } = customerData;
  return sql`
    UPDATE customer SET
    email=${email}, password=${password}, name=${name}, contact=${contact}, address=${address}
    WHERE id=${customerId}`;
};

const deleteCustomer = (customerId) => sql`
    DELETE FROM customer
    WHERE id = ${customerId}
  `;

module.exports = {
  selectAllCustomers,
  selectCustomerById,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
