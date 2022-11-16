const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { users }  = require('../../database/models');
const loginService = require('../../services/users/LoginService');
const { userLoginMock, userMock, nonRegisteredUser, badUserLogin , userTokenMock } = require('../mocks/userMocks');
const jwtServices = require('../../helpers/Token');

describe('login Service', () => {
  describe('When making a login', () => {
    describe('with success', () => {
      before(() => {
        sinon.stub(users, 'create').resolves(userMock);
        sinon.stub(jwtServices, 'createToken').returns(userTokenMock);
      });
      after(() => {
        sinon.restore();
      });

      it('Should return an object', async () => {
        const user = await loginService.login(userLoginMock.email, userLoginMock.password);

        expect(user).to.be.an('object');
      });

      it('Should return an object with "status" and "json"', async () => {
        const user = await loginService.login(userLoginMock.email, userLoginMock.password);

        expect(user).to.have.all.keys('email', 'id', 'name', 'role', 'token');
      });

      it('Should return an object with json with token and status 200', async () => {
        const user = await loginService.login(userLoginMock.email, userLoginMock.password);

        expect(user.name).to.be.eq(userMock.name);
        expect(user.role).to.be.eq(userMock.role);
        expect(user.token).to.be.eq(userTokenMock);
      });
    });

    describe('When it fails', () => {

      it('Should return an object with "status" and "json" with "message"', async () => {
        const user = await loginService.login('', 'any-pass');

        expect(user).to.be.eq(null);
      })
    })
   })
});
