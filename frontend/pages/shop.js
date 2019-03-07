import styled from "styled-components";
import MeanCoffeeHeader from "../components/shop-components/MeanCoffeeHeader";
import CartFooter from "../components/shop-components/CartFooter";
import ItemCardList from "../components/shop-components/ItemCardList";
import ItemCard from "../components/shop-components/ItemCard";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import fetchData from "../lib/fetchData";
const ShopPage = () => {
  const [merchandise, setMerchandise] = useState([]);
  const { cartItems, setCartItems, deleteCartItem } = useCartItem();

  useEffect(() => {
    const { data } = fetchData(
      "http://localhost:2019/merchandise",
      setMerchandise
    );
  }, []);

  return (
    <ShopWrapper>
      <MeanCoffeeHeader />
      <MainContent>
        <ItemCardList>
          {merchandise.map(item => {
            return (
              <ItemCard
                key={item.productid}
                title={item.productname}
                description={item.description}
                image={item.image}
                actionBtn={
                  <Button
                    type="primary"
                    onClick={() => {
                      setCartItems([...cartItems, item]);
                    }}
                  >
                    Buy {`$${item.price}`}
                  </Button>
                }
              />
            );
          })}
        </ItemCardList>
      </MainContent>
      <CartFooter cartItems={cartItems} deleteCartItem={deleteCartItem} />
    </ShopWrapper>
  );
};
const useCartItem = () => {
  const [cartItems, setCartItems] = useState([]);

  const deleteCartItem = id => {
    console.log(cartItems);
    const deleteIndex = cartItems.findIndex(item => {
      return (item.productid = id);
    });
    setCartItems([
      ...cartItems.slice(0, deleteIndex),
      ...cartItems.slice(deleteIndex + 1)
    ]);
  };

  return {
    cartItems,
    setCartItems,
    deleteCartItem
  };
};
const MainContent = styled.main`
  padding: 0.5em;
`;
const ShopWrapper = styled.div``;
export default ShopPage;
