import OrderHistoryDrawer from "../components/shop-components/OrderHistoryDrawer";
import {useState, useEffect} from "react";
import {Button} from "antd";
import axios from "axios";
import {createBearerAxios} from "../lib/axiosInstances";
import orderDataManipulator from "../lib/manipulateData/orderDataManipulator";
const mockOrderData = [
  {
    description: "description1",
    orderid: 1,
    productname: "brazil coffee",
    price: 10.5,
    image: "brazil-coffee-beans",
    quantityinorder: 8,
  },
];
const TestPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const {data} = await createBearerAxios({
          method: "get",
          url: `/orders/userid/${window.localStorage.getItem("userid")}`,
        });
        const ordersTable = orderDataManipulator(data);
        setOrders(Object.values(ordersTable));
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  });
  return (
    <>
      <OrderHistoryDrawer
        isMainVisible={isVisible}
        setIsMainVisible={setIsVisible}
        mainData={mockOrderData}
      />
      <Button onClick={() => setIsVisible(true)}>Open</Button>
    </>
  );
};

{
  /* <CardsList
onClick={() => {
  setIsChildVisible(true);
}}
>
{mainData.map((order: Order) => {
  <Card key={order.id} title={`Order Date: ${order.date}`}>
    {order.content}
  </Card>;
})}
</CardsList> */
}
export default TestPage;
