import uuidv4 from "uuid/v4";

export default (orderData: any[]) => {
  const orderCardsData: any = {};

  for (let i = 0; i < orderData.length; i++) {
    let order = orderData[i];

    let {orderid, price, orderdatetime} = order;
    if (orderCardsData[orderid] === undefined) {
      orderCardsData[orderid] = {
        totalPrice: price,
        date: orderdatetime.match(/\d+-\d+-\d+/)[0],
        time: orderdatetime.match(/\d+:\d+:\d+/)[0],
        keyId: uuidv4(),
        orderId: orderid,
      };
    } else {
      orderCardsData[orderid].totalPrice += price;
    }
  }
  console.log(orderCardsData);

  return orderCardsData;
};
