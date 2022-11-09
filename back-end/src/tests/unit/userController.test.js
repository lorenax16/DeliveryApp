const chai = require('chai');
const sinon = require('sinon');

const { expect } = chai;
const { userService } = require('../../services');
const { tokenHelper } = require('../../helpers');
const testController = require('../helpers/testController');
const { userController } = require('../../controllers');
const { userLoginMock, userMock, sellerMock } = require('../mocks/userMocks');

describe('User controller', () => {
  let loginStub;
  let createStub;
  let token;
  let getSellersStub;

  before(() => {
    loginStub = sinon.stub(userService, 'login');
    createStub = sinon.stub(userService, 'create');
    getSellersStub = sinon.stub(userService, 'getSellers');
    token = tokenHelper.createToken({
      email: 'test@test.com',
      password: 'test_password',
      role: 'customer',
    });
  });
  after(() => {
    loginStub.restore();
    createStub.restore();
    getSellersStub.restore();
  });

  describe('login', () => {
    before(() => loginStub.resolves(token));
    describe('Success', () => {
      it('should return code 200 and a token in the response body', async () => {
        const loginData = { ...userLoginMock };
        const response = await testController(userController.login, { body: loginData });

        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.haveOwnProperty('token', token);
      });
    });
  });

  describe('create', () => {
    before(() => createStub.resolves(userMock));

    describe('Success', () => {
      it('should return code 201 and a token in the response body', async () => {
        const userData = { ...userMock };
        delete userData.id;
        const response = await testController(userController.create, { body: userData });
        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.haveOwnProperty('id', userMock.id);
        expect(response.body).to.be.haveOwnProperty('name', userMock.name);
        expect(response.body).to.be.haveOwnProperty('email', userMock.email);
        expect(response.body).to.be.haveOwnProperty('role', userMock.role);
      });
    });
  });

  describe('createCustomer', () => {
    before(() => {
      createStub.resolves(userMock);
    });

    describe('Success', () => {
      it('should return code 201 and a token in the response body', async () => {
        const userData = { ...userMock };
        delete userData.id;
        delete userData.role;
        const response = await testController(userController.createCustomer, { body: userData });

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.haveOwnProperty('token');
      });
    });
  });

  describe('getSeller', () => {
    before(() => {
      getSellersStub.resolves(sellerMock);
    });

    describe('Success', () => {
      it('should return code 201 and a seller in the response body', async () => {
        const response = await testController(userController.getSellers);

        expect(response.status).to.be.equal(201);
        expect(response.body).to.be.equal(sellerMock);
      });
    });
  });
});
