const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { users }  = require('../../database/models/users');
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

        expect(user).to.have.all.keys('status', 'json');
      });

      it('Should return an object with json with token and status 200', async () => {
        const user = await loginService.login(userLoginMock.email, userLoginMock.password);

        expect(user.json).to.have.all.keys('name', 'role', 'userToken');
        expect(user.status).to.be.eq(200);
        expect(user.json.name).to.be.eq(userMock.name);
        expect(user.json.role).to.be.eq(userMock.role);
        expect(user.json.userToken).to.be.eq(userTokenMock);
      });
    });

    describe('When it fails', () => {

      it('Should return an object with "status" and "json" with "message"', async () => {
        const user = await loginService.login('', 'any-pass');

        expect(user).to.be.an('object');
        expect(user).to.be.have.all.keys('status', 'json');
      })

      it('Should return an Error with status 400 and message "erro!"', async () => {
        const user = await loginService.login('', 'any-pass');

        expect(user.status).to.be.eq(400);
        expect(user.json.message).to.be.eq('Algum campo está vazio');
      });

      it('Should return an object with status 404 and message "User not found"', async () => {
        const user = await loginService.login(nonRegisteredUser.email, nonRegisteredUser.password);

        expect(user.status).to.be.eq(404);
        expect(user.json.message).to.be.eq('User not found');
      });

      it('Should return an Error with status 401 and message "Invalid password"', async () => {
        const user = await loginService.login(badUserLogin.email, badUserLogin.password);

        expect(user.status).to.be.eq(401);
        expect(user.json.message).to.be.eq('Invalid password');
      });
    })
   })
});
