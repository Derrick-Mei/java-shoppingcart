import OrderHistoryDrawer from "../components/shop-components/OrderHistoryDrawer";
import {useState, useEffect} from "react";
import {Button} from "antd";
import axios from "axios";
import {createBearerAxios} from "../lib/axiosInstances";
import manipulateForOrderCards from "../lib/manipulateData/manipulateForOrderCards";
import getCustomerOrdersByUserId from "../lib/requestsEndpoints/getCustomerOrdersByUserId";

const TestPage = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [orders, setOrders] = useState({});
  useEffect(() => {}, []);
  return (
    <>
      <OrderHistoryDrawer
        isMainVisible={isVisible}
        setIsMainVisible={setIsVisible}
        ordersData={orders}
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
