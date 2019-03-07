import styled from "styled-components";
import {
  Menu,
  Dropdown,
  Button,
  Icon,
  Badge,
  Avatar,
  Drawer,
  message
} from "antd";
import { useState } from "react";
import ItemCardList from "./ItemCardList";
import ItemCard from "./ItemCard";
import Router from "next/router";
const CartFooter = ({ cartItems, deleteCartItem }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <CartFooterWrapper>
      <TotalDisplay>
        {cartItems.reduce((accumulator, item) => {
          return accumulator + item.price;
        }, 0)}
      </TotalDisplay>
      <ItemsQueueContainer>
        {/* returns the last three item indexes */}
        {cartItems
          .slice(-3)
          .reverse()
          .map(item => {
            return (
              <Avatar
                key={item.keyId}
                shape="circle"
                size="small"
                src={item.src}
                style={{ marginLeft: "12px" }}
              >
                {item.productid}
              </Avatar>
            );
          })}
      </ItemsQueueContainer>
      <CartBtn onClick={() => setDrawerOpen(true)}>
        <Badge offset={[16, 6]} count={cartItems.length} showZero={false}>
          Cart
        </Badge>
      </CartBtn>
      <Drawer
        title="Items In Cart"
        placement="left"
        closable={true}
        onClose={() => setDrawerOpen(false)}
        visible={isDrawerOpen}
      >
        <FinishBtn
          type="primary"
          onClick={() =>
            Router.push({
              pathname: "/checkout"
            })
          }
        >
          Finish Checkout
        </FinishBtn>
        <ItemCardList>
          {cartItems.map(item => {
            return (
              <ItemCard
                key={item.keyId}
                title={item.productname}
                description={item.description}
                image={item.image}
                actionBtn={
                  <Button
                    type="danger"
                    onClick={() => deleteCartItem(item.keyId)}
                  >
                    Delete
                  </Button>
                }
              />
            );
          })}
        </ItemCardList>
      </Drawer>
    </CartFooterWrapper>
  );
};

const CartFooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.black};
  padding: 0.2em;
`;
const TotalDisplay = styled.div`
  display: flex;
  justify-content: center;
  width: 7rem;
  color: ${props => props.theme.white};
`;
const ItemsQueueContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CartBtn = styled(Button)`
  color: ${props => props.theme.white};
  background: ${props => props.theme.black};
  padding: 0.5em;
  padding-right: 2em;
  border: none;
  border-radius: 0;
  margin: 0;
  height: 100%;
`;
const CartBadge = styled(Badge)`
  background: ${props => props.theme.orange};
`;

const FinishBtn = styled(Button)``;

export default CartFooter;
