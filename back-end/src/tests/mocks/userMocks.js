const userMock = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  password: "a4c86edecc5aee06eff8fdeda69e0d04", //senha: md5('--adm2@21!!--')
  role: "administrator",
};

const userTokenMock =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYmF0YXRpbmhhQGhvdG1haWwuY29tIiwiaWF0IjoxNjY3MjUyNDA2LCJleHAiOjE2Njc4NTcyMDZ9.ID3JdzGwqmin7j9m-5n_yP-MYmkbU96BE0-Ic-PHIBo";

const userLoginMock = {
  email: "adm@deliveryapp.com",
  password: "--adm2@21!!--",
};

const badUserLogin = {
  email: "adm@deliveryapp.com",
  password: "--adm2@21!!-",
};

const nonRegisteredUser = {
  email: "failure@deliveryapp.com",
  password: "passwordfail",
};

const createUserMockReturn = {
  dataValues: {
    id: 2,
    name: "Aluno Trybe",
    email: "aluno@hotmail.com",
    password: "f9104c649c25423a30e2968573899f48", 
    role: "customer",
  },
};

const createUserMock = {
  name: "Aluno Trybe",
  email: "aluno@hotmail.com",
  password: "f9104c649c25423a30e2968573899f48",
};

module.exports = {
  userLoginMock,
  userMock,
  userTokenMock,
  badUserLogin,
  nonRegisteredUser,
  createUserMockReturn,
  createUserMock,
};
