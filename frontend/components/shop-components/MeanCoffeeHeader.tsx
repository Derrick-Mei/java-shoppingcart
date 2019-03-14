import styled from "styled-components";
import { Button,  Drawer } from "antd";
import { useState } from "react";

const MeanCoffeeHeader = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
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
        <DrawerBtn block>User Profile</DrawerBtn>
        <DrawerBtn block>Order History</DrawerBtn>
        <DrawerBtn block>Light / Dark</DrawerBtn>
      </Drawer>
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
  block: true
})`
  height: 5rem;
  margin-bottom: 2.4rem;
`;

export default MeanCoffeeHeader;
