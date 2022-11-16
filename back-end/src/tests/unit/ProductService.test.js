const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { products }  = require('../../database/models/products');
const productService = require('../../services/products/ProductService');
const { productsListMock } = require('../mocks/productMock');

describe('Product Service', () => {
  describe('Should list all products', () => {
    describe('When it is successful', () => {
      before(() => {
        sinon.stub(products, 'findAll').resolves(productsListMock);

      });
      after(() => {
        sinon.restore();
      });

      it('Should return an object with key "status" and "json"', async () => {
        const products = await productService.findAll();

        expect(products).to.be.an('object');
        expect(products).to.have.all.keys('status', 'json');
      });

      it('Should return an object json with a list of products with status 200', async () => {
        const products = await productService.findAll();

        expect(products.status).to.be.eq(200);
        expect(products.json).to.be.eq(productsListMock);
      });
    });
   });
});
