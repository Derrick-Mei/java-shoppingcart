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
const CartFooter = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <CartFooterWrapper>
      <TotalDisplay>$55.55</TotalDisplay>
      <ItemsQueueContainer>
        <Avatar shape="circle" size="small" icon="user" />
        <Avatar shape="circle" size="small" icon="user" />
      </ItemsQueueContainer>
      <CartBtn onClick={() => setDrawerOpen(true)}>
        <Badge offset={[16, 6]} count={5} showZero={false}>
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
        <ItemCardList>
          <ItemCard
            actionBtn={
              <Button type="danger" onClick={() => console.log("delete")}>
                Delete
              </Button>
            }
          />
        </ItemCardList>
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
  margin-right: 12px;
  background: ${props => props.theme.white};
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
