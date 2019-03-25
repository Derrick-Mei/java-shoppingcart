import OrderHistoryDrawer from "../components/shop-components/OrderHistoryDrawer";
import {useState, useEffect} from "react";
import {Button} from "antd";
import axios from "axios";
import {createBearerAxios} from "../lib/axiosInstances";
const mockOrderData = [
  {
    id: 1,
    date: "12/24/2222",
    content: "The content",
  },
];
const TestPage = () => {
  const [isVisible, setIsVisible] = useState(true);

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
