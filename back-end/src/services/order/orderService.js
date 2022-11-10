const { sales, salesProducts, products } = require('../../database/models');
const { getSellersId } = require('../users/GetUsersService');

const getByIdSalesProducts = async (id) => {
  const result = await products.findAll({
    include: [{
      where: { saleId: id },
      model: salesProducts, as: 'ProdutoVendido'
    }]
  });

  if (!result) return null;
  return result;
};

const getByIdSales = async (id) => {
  const info = await sales.findByPk(id);

  const products = await getByIdSalesProducts(id);
  const nomePessoaVendedora = await getSellersId(info.sellerId);

  const result = {
    info,
    nomePessoaVendedora,
    products,
  }

  if (!result.info || !result.products) return null;
  return result;
};

const patchSale = async (id) => {
  const result = await sales.update({ status: 'entregue' }, { where: { id }});

  if (!result) return null;
  return result;
};

module.exports = { getByIdSales, getByIdSalesProducts, patchSale };

