const salesMock = {
  "userId": 2,
	"sellerId": 1,
	"totalPrice": 97.25,
	"deliveryAddress": "Travessa da Rua",
	"deliveryNumber": "198",
	"productsList": [
		{
			"productId": 2,
			"quantity": 3
		},
		{
			"productId": 3,
			"quantity": 7
		}
	] 
};

const saleVendedor = {
info:{
vendedor: 1,
endereço: 'rua do teste do backend',
numero: 228, 
},
products: [ {
  "productId": 2,
  "quantity": 3
},
{
  "productId": 3,
  "quantity": 7
}],
total: 228.50
}

const salesReturnMock = {
  dataValues: {
    id: 1,
    userId: 2,
	  sellerId: 1,
	  "totalPrice": 97.25,
	  "deliveryAddress": "Rua do Teste Backend",
	  "deliveryNumber": "198",
	  "productsList": [
		  {
			  "productId": 2,
			  "quantity": 3
		  },
		  {
			  "productId": 8,
			  "quantity": 7
		  }
	  ],
  },
};

const salesProductId1 = {
  "saleId": 1,
	"productId": 2,
	"quantity": 3
};

const salesProductId2 = {
  "saleId": 2,
  "productId": 2,
	"quantity": 7
};

module.exports = {
  salesMock,
  salesReturnMock,
  salesProductId1,
  salesProductId2,
  saleVendedor,
}
