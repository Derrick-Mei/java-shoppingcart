import {Drawer, Card} from "antd";
import styled from "styled-components";
import {useState} from "react";
import {formatMoney} from "../../lib/formatMoney";
import getOrderByOrderId from "../../lib/requestsEndpoints/getOrderByOrderId";
import ItemCard from "./ItemCard";
interface Order {
  keyId: string;
  totalPrice: number;
  date: string;
  time: string;
  orderId: number;
  id: string;
}
interface Props {
  isMainVisible: boolean;
  setIsMainVisible: Function;
  ordersData: [Order];
}
const OrderHistoryDrawer: React.SFC<Props> = ({
  isMainVisible,
  setIsMainVisible,
  ordersData,
}) => {
  const [isChildVisible, setIsChildVisible] = useState(false);
  const [itemsInOrder, setItemsInOrder] = useState([]);
  const [shipping, setShipping] = useState({});

  return (
    <>
      <ParentDrawer
        title={"Your Past Orders"}
        visible={isMainVisible}
        placement={"left"}
        onClose={() => setIsMainVisible(false)}
      >
        <CardsList
          onClick={e => {
            setIsChildVisible(true);
            //@ts-ignore
            setItemsInOrder(
              ordersData.find(order => {
                return order.orderId === Number(e.target.dataset.orderid);
              }).itemsInOrder,
            );
          }}
        >
          {ordersData.length
            ? ordersData.map((order: any) => {
                return (
                  <OrderCardWrapper
                    key={order.orderId}
                    data-orderid={order.orderId}
                  >
                    <OrderCard title={`${order.orderId}`}>
                      <p>
                        Order Date:
                        {order.shipDateTime.match(/\d+-\d+-\d+/)}
                      </p>
                      <p>
                        Order Time:
                        {order.shipDateTime.match(/\d+:\d+:\d+/)}
                      </p>
                    </OrderCard>
                  </OrderCardWrapper>
                );
              })
            : null}
        </CardsList>
      </ParentDrawer>
      <ChildDrawer
        title={`Order`}
        visible={isChildVisible}
        placement={"left"}
        onClose={() => setIsChildVisible(false)}
      >
        {itemsInOrder.length
          ? itemsInOrder.map((item: any) => {
              // console.log(item);
              const {product} = item;
              return (
                <ItemCard
                  imagePublicId={product.image}
                  imageHeight={100}
                  imageWidth={100}
                  title={product.productName}
                  description={product.description}
                />
              );
            })
          : null}
      </ChildDrawer>
    </>
  );
};
const ParentDrawer = styled(Drawer)``;
const ChildDrawer = styled(Drawer)``;

const OrderCard = styled(Card)`
  pointer-events: none;
`;
const OrderCardWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 12px;
  &:hover {
    -webkit-box-shadow: 0px 0px 5px 8px rgba(51, 51, 51, 0.06);
    -moz-box-shadow: 0px 0px 5px 8px rgba(51, 51, 51, 0.06);
    box-shadow: 0px 0px 5px 8px rgba(51, 51, 51, 0.06);
  }
`;
const CardsList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
export default OrderHistoryDrawer;
