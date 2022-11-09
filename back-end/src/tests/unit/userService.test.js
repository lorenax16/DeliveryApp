const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const expect = chai.expect
chai.use(chaiAsPromised);

const { User } = require('../../database/models');
const { userService } = require('../../services');
const { userMock, sellerMock } = require('../mocks/userMocks');

describe('User service', () => {
  let findOneStub;
  let findAllStub;
  let createStub;

  before(() => {
    findOneStub = sinon.stub(User, 'findOne');
    findAllStub = sinon.stub(User, 'findAll');
    createStub = sinon.stub(User, 'create');
  });

  after(() => {
    findOneStub.restore();
    findAllStub.restore();
    createStub.restore();
  });

  describe('login', () => {
    describe('Success', () => {
      before(() => findOneStub.resolves(userMock));
      it('should return a token', async () => {
        const userData = {
          email: 'test@test.com',
          password: 'test12345'
        };
    
        await expect(userService.login(userData)).to.eventually.to.be.an('string');
      });
    });
    describe('Failure', () => {
      before(() => findOneStub.resolves(null));
      it('should throw an error', async () => {
        const userData = {
          email: 'test@test.com',
          password: 'test12345'
        };
    
        await expect(userService.login(userData)).to.eventually.to.rejectedWith('User not found');
      });
    });
  });

  describe('create', () => {
    describe('Success', () => {
      before(() => {
        findOneStub.resolves(null)
        createStub.resolves(userMock);
      });

      it('should return an object', async () => {
        const userData = {
          email: 'ze_delivery@email.com',
          name: 'Ze Delivery',
          password: '71e227587b8a3ff3da9eb524e18185af', 
          role: 'customer'// password: deliveryPassword
        };

        const createdUser = await userService.create(userData);

        expect(createdUser).to.be.an('object');
        expect(createdUser).to.haveOwnProperty('id', userMock.id);
        expect(createdUser).to.haveOwnProperty('email', userMock.email);
        expect(createdUser).to.haveOwnProperty('name', userMock.name);
        expect(createdUser).to.haveOwnProperty('password', userMock.password);
        expect(createdUser).to.haveOwnProperty('role', userMock.role);
      });
    });

    describe('Failure', () => {
      before(() => findOneStub.resolves(userMock));
      it('should throw an error', async () => {
        const userData = {
          email: 'ze_delivery@email.com',
          name: 'Ze Delivery',
          password: '71e227587b8a3ff3da9eb524e18185af', // password: deliveryPassword
        };
    
        await expect(userService.create(userData)).to.eventually.to.rejectedWith('Email address is already registered!');
      });
    });
  });

  describe('getSellers', () => {
    describe('Success', () => {
      before(() => findAllStub.resolves(sellerMock));

      it('should return a seller on body', async () => {

        await expect(userService.getSellers()).to.eventually.to.be.an('object');
      });
    });
  });
});
