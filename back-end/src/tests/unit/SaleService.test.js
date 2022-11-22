const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { sales, salesProducts } = require('../../database/models');
const salesService = require('../../services/sales/SalesService');
const {userTokenMock} = require('../mocks/userMocks');
const { salesProductId1, salesProductId2, salesReturnMock, saleVendedor } = require('../mocks/saleMock');
const { verifyToken } = require('../../helpers/Token');
const  jwt = require('jsonwebtoken');


describe('Sales Service', () => {
  describe('With an attempt to create a sale ', () => {
    describe('with success', () => {
      before(() => {
        sinon.stub(sales, 'create').resolves(salesReturnMock);
        sinon.stub(salesProducts, 'create')
          .onCall(0).resolves(salesProductId1)
          .onCall(1).resolves(salesProductId2);
        sinon.stub(jwt, 'verify').returns({});
      });
      after(() => {
        sinon.restore();
      });

      it('Should return an object with a key "status" and "json"', async () => {
        const newUser = await salesService.createSale(saleVendedor, userTokenMock);

        expect(newUser).to.be.an('object');
        expect(newUser).to.have.all.keys('deliveryAddress','deliveryNumber','id','productsList','sellerId','totalPrice', 'userId');
      });

  
    });
   })
});
