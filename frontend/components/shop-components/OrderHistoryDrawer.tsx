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
  const [products, setProducts] = useState([]);
  const [shipping, setShipping] = useState({});
  const fetchOrderInfo = async (orderId: number) => {
    const specificOrderData = await getOrderByOrderId(orderId);
    const {
      orderproducts,
      shippedstatus,
      shippingaddress,
    } = specificOrderData;
    setProducts(orderproducts);
    setShipping({
      status: shippedstatus,
      address: shippingaddress,
    });
    console.log(specificOrderData);
  };
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
            fetchOrderInfo(e.target.dataset.orderid);
          }}
        >
          {Object.keys(ordersData).map((id: any) => {
            return (
              <OrderCardWrapper
                data-orderid={id}
                key={ordersData[id].keyId}
              >
                <OrderCard
                  title={`Total Order Price: ${formatMoney(
                    ordersData[id].totalPrice,
                  )}`}
                >
                  <p>Order Date: {ordersData[id].date}</p>
                  <p>Order Time: {ordersData[id].time}</p>
                </OrderCard>
              </OrderCardWrapper>
            );
          })}
        </CardsList>
      </ParentDrawer>
      <ChildDrawer
        title={`Order`}
        visible={isChildVisible}
        placement={"left"}
        onClose={() => setIsChildVisible(false)}
      >
        {products
          ? products.map((product: any) => {
          return (
            <ItemCard
              imagePublicId={product.image}
              imageHeight={100}
              imageWidth={100}
              title={product.productname}
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
