import styled from "styled-components";
import {
  Button,
  Badge,
  Avatar,
  Drawer,
} from "antd";
import { useState } from "react";
import ItemCardList from "./ItemCardList";
import ItemCard from "./ItemCard";
import Router from "next/router";
import { CartItem as ICartItem } from "../../interfaces/index";
import { formatMoney } from "../../lib/formatMoney";
interface Props {
  cartItems: [ICartItem]
  deleteCartItem: Function,
  userId: number,
}
 

const CartFooter: React.SFC<Props> = ({ cartItems, deleteCartItem, userId }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <CartFooterWrapper>
      <TotalDisplay>
        {formatMoney(cartItems.reduce((accumulator, item) => {
          return accumulator + item.price;
        }, 0))}
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
                description={formatMoney(item.price)}
                image={item.image}
                actionBtn={
                  <Button
                    type="danger"
                    onClick={() => deleteCartItem(item, userId)}
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
  justify-content: center;
  width: 100%;
`;

const CartBtn = styled(Button)`
  color: ${(props: any) => props.theme.white};
  background: ${(props:any) => props.theme.black};
  padding: 0.5em;
  padding-right: 2em;
  border: none;
  border-radius: 0;
  margin: 0;
  height: 100%;
`;

const FinishBtn = styled(Button)`
  margin-bottom: 2rem;
`;

export default CartFooter;
