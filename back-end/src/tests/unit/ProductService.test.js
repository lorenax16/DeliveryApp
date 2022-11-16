const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');

const { products }  = require('../../database/models/');
const productService = require('../../services/products/ProductService');
const { productsListMock } = require('../mocks/productMock');

describe('Product Service', () => {
  describe('Should list all products', () => {
    describe('When it is successful', () => {
      before(() => {
        sinon.stub(products, 'findAll').resolves(productsListMock);
      // products da model 
      });
      after(() => {
        sinon.restore();
      });

      it('Should return an object with key "status" and "json"', async () => {
        const products = await productService.getAll();

        expect(products).to.be.an('array');
      });

      it('Should return an object json with a list of products with status 200', async () => {
        const products = await productService.getAll();

        expect(products).to.be.eq(productsListMock);
      });
    });
   });
});
