// const exampleOrdersTable = {
//   1: {
//     "mean-bean": {
//       image: "",
//       price: 52,
//       quantity: 3
//     },
//   },
//   2: {
//     "bean": {
//       image: "",
//       price: 22,
//       quantity: 1
//     },
//   },
// };

export default (orderData: any[]) => {
  const ordersTable: any = {};
  for (let i = 0; i < orderData.length; i++) {
    const order = orderData[i];
    const {orderid, image, productname, price} = order;

    if (ordersTable[orderid] === undefined) {
      ordersTable[orderid] = {
        [productname]: {
          image,
          price,
          quantity: 1,
        },
      };
    } else {
      if (ordersTable[orderid][productname]) {
        ordersTable[orderid][productname].quantity += 1;
      } else {
        ordersTable[orderid][productname] = {
          image,
          price,
          quantity: 1,
        };
      }
    }
  }
  return ordersTable;
};
