const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const { expect } = chai;
chai.use(chaiAsPromised);
const { Sale, SaleProduct } = require('../../database/models');
const { saleService } = require('../../services');
const { saleMock, salesUserMock,
  createSaleDataMock, saleUpdated } = require('../mocks/saleMock');

describe('Sale service', () => {
  let findAllStub;
  let findByPkStub;
  let createStub;
  let updateStub;
  let findOneStub;

  before(() => {
    findAllStub = sinon.stub(Sale, 'findAll');
    findByPkStub = sinon.stub(Sale, 'findByPk');
    createStub = sinon.stub(Sale, 'create');
    updateStub = sinon.stub(Sale, 'update');
    findOneStub = sinon.stub(Sale, 'findOne');

    sinon.stub(SaleProduct, 'bulkCreate');
  });
  after(() => {
    findAllStub.restore();
    findByPkStub.restore();
    createStub.restore();
    updateStub.restore();
    findOneStub.restore();

    SaleProduct.bulkCreate.restore();
  });
  describe('create', () => {
    describe('Success', () => {
      before(() => createStub.resolves(saleMock));
      it('should return a sale object', async () => {
        const saleData = { ...createSaleDataMock };
        const sut = await saleService.create(saleData);
        expect(sut).to.be.an('object');
        expect(sut).to.haveOwnProperty('id', saleMock.id);
        expect(sut).to.haveOwnProperty('userId', saleMock.userId);
        expect(sut).to.haveOwnProperty('sellerId', saleMock.sellerId);
        expect(sut).to.haveOwnProperty('totalPrice', saleMock.totalPrice);
        expect(sut).to.haveOwnProperty('deliveryAddress', saleMock.deliveryAddress);
        expect(sut).to.haveOwnProperty('deliveryNumber', saleMock.deliveryNumber);
        expect(sut).to.haveOwnProperty('saleDate', saleMock.saleDate);
        expect(sut).to.haveOwnProperty('status', saleMock.status);
      });
    });
  });
  describe('getUserOrders', () => {
    describe('Success', () => {
      describe('userId', () => {
        before(() => findAllStub.resolves(salesUserMock.filter(({ userId }) => userId === 3)));
        it('should return an user sales array', async () => {
          const data = { id: 1, role: 'customer' };
          const sut = await saleService.getUserOrders(data);
          expect(sut).to.be.an('array');
          expect(sut[0]).to.haveOwnProperty('userId', 3);
        });
      });
      describe('sellerId', () => {
        before(() => findAllStub.resolves(salesUserMock.filter(({ sellerId }) => sellerId === 1)));
        it('should return an seller sales array', async () => {
          const data = { id: 3, role: 'seller' };
          const sut = await saleService.getUserOrders(data);
          expect(sut).to.be.an('array');
          expect(sut[0]).to.haveOwnProperty('sellerId', 1);
        });
      });
    });
  });

  describe('getOrderById', () => {
    describe('Success', () => {
      before(() => {
        findByPkStub.resolves(saleMock);
        findOneStub.resolves(salesUserMock[1]);
      });

      it('should return an user sale object', async () => {
        await expect(saleService.getOrderById(2))
          .to.eventually.to.be.an('object')
          .and.to.be.eql(salesUserMock[1]);
      });
    });

    describe('Failure', () => {
      before(() => {
        findByPkStub.resolves(null);
        findOneStub.resolves(null);
      });

      it('should return an error', async () => {
        await expect(saleService.getOrderById(90))
          .to.eventually.to.rejectedWith('Order not found');
      });

      it('should return an user sale object', async () => {
        await expect(saleService.getOrderById(90))
          .to.eventually.to.rejectedWith('Order not found');
      });
    });
  });
  describe('updateOrderStatus', () => {
    describe('Success', () => {
      before(() => {
        updateStub.resolves([1]);
        findByPkStub.resolves(saleUpdated);
      });
      it('should return an user sale object updated', async () => {
        const updateData = { id: 1, status: 'Entregue' };
        await expect(saleService.updateOrderStatus(updateData))
          .to.eventually.to.be.an('object')
          .and.to.be.eql(saleUpdated);
      });
    });
    describe('Failure', () => {
      describe('When status is invalid', () => {
        before(() => updateStub.resolves(null));

        it('should throw an invalid status error', async () => {
          const updateData = { id: 1, status: 'xablau' };
          await expect(saleService.updateOrderStatus(updateData))
            .to.eventually.to.rejectedWith('Invalid status');
        });
      });
      describe('When sale is not found', () => {
        before(() => findByPkStub.resolves(null));
        it('should throw an invalid status error', async () => {
          const updateData = { id: 90, status: 'Entregue' };
          await expect(saleService.updateOrderStatus(updateData))
            .to.eventually.to.rejectedWith('Order not found');
        });
      });
    });
  });
});
