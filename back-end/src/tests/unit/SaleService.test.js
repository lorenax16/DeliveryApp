const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { sales, salesProducts } = require('../../database/models');
const salesService = require('../../services/sales/SalesService');
const { salesMock, salesProductWithId1, salesProductWithId2, salesReturnMock } = require('../mocks/saleMock');


describe('Sales Service', () => {
  describe('With an attempt to create a sale ', () => {
    describe('with success', () => {
      before(() => {
        sinon.stub(sales, 'createSale').resolves(salesReturnMock);
        sinon.stub(salesProducts, 'createSale')
          .onCall(0).resolves(salesProductWithId1)
          .onCall(1).resolves(salesProductWithId2);
      });
      after(() => {
        sinon.restore();
      });

      it('Should return an object with a key "status" and "json"', async () => {
        const newUser = await salesService.createSale(salesMock);

        expect(newUser).to.be.an('object');
        expect(newUser).to.have.all.keys('status', 'json');
      });

      it('Should return an object with status 201 and json with a message "OK"', async () => {
        const newUser = await salesService.createSale(salesMock);


        expect(newUser.status).to.be.eq(201);
        expect(newUser.json).to.be.deep.eq({ message: 'OK' });
      });
    });
   })
});
