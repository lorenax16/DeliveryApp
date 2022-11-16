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


const salesReturnMock = {
  dataValues: {
    id: 1,
    userId: 2,
	  sellerId: 1,
	  "totalPrice": 97.25,
	  "deliveryAddress": "Rua do Teste",
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
	  ],
  },
};

const salesProductWithId1 = {
  "saleId": 1,
	"productId": 2,
	"quantity": 3
};

const salesProductWithId2 = {
  "saleId": 2,
  "productId": 2,
	"quantity": 7
};

module.exports = {
  salesMock,
  salesReturnMock,
  salesProductWithId1,
  salesProductWithId2,
}
