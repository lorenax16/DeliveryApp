const userMock = {
  id: 1,
  email: 'ze_delivery@email.com',
  name: 'Ze Delivery',
  password: '71e227587b8a3ff3da9eb524e18185af', // password: deliveryPassword
  role: 'customer',
};
const userLoginMock = {
  email: 'ze_delivery@email.com',
  password: '71e227587b8a3ff3da9eb524e18185af', // password: deliveryPassword
};

const sellerMock = {
  id: 2,
  name: 'Fulana Pereira',
  email: 'fulana@deliveryapp.com',
  password: '3c28d2b0881bf46457a853e0b07531c6',
  role: 'seller',
  // -- senha: md5('fulana@123')
};

module.exports = {
  userMock,
  userLoginMock,
  sellerMock,
};
