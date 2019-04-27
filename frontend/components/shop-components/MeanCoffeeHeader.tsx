import styled from "styled-components";
import {Button, Drawer} from "antd";
import {useState, useEffect} from "react";
import Router from "next/router";
import OrderHistoryDrawer from "./OrderHistoryDrawer";
import {getCustomerOrdersByUserId} from "../../lib/requestsEndpoints";
import manipulateForOrderCards from "../../lib/manipulateData/manipulateForOrderCards";

const MeanCoffeeHeader = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [orders, setOrders] = useState({});
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = window.localStorage.getItem("userid");
        const orderData = await getCustomerOrdersByUserId(userId);
        const ordersCardsData = manipulateForOrderCards(orderData);
        setOrders(ordersCardsData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrders();
  }, []);
  return (
    <MeanCoffeeWrapper>
      <Title>
        Mean!
        <br /> <Emphasis>Mean! Coffee Beans</Emphasis>
      </Title>
      <MenuBtn onClick={() => setDrawerOpen(true)}>Menu</MenuBtn>
      <Drawer
        title="Menu Options"
        placement="left"
        closable={true}
        onClose={() => setDrawerOpen(false)}
        visible={isDrawerOpen}
      >
        <DrawerBtn
          block
          onClick={() =>
            Router.push({
              pathname: "/user-profile",
            })
          }
        >
          User Profile
        </DrawerBtn>
        <DrawerBtn onClick={() => setIsOrderDrawerOpen(true)} block>
          Order History
        </DrawerBtn>
        {/* <DrawerBtn block>Light / Dark</DrawerBtn> */}
      </Drawer>

      <OrderHistoryDrawer
        isMainVisible={isOrderDrawerOpen}
        setIsMainVisible={setIsOrderDrawerOpen}
        ordersData={orders}
      />
    </MeanCoffeeWrapper>
  );
};

const MeanCoffeeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.black};
  padding: 0.5em;
`;
const Emphasis = styled.strong`
  font-size: 1.6rem;
`;
const Title = styled.h1`
  color: ${props => props.theme.white};
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.3;
  margin-bottom: 0;
`;

const MenuBtn = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.orange};
  color: ${props => props.theme.white};
  padding: 0.1em 0.5em;
  font-size: 1.4rem;
  border: none;
`;

const DrawerBtn = styled(Button).attrs({
  block: true,
})`
  height: 5rem;
  margin-bottom: 2.4rem;
`;

export default MeanCoffeeHeader;
