import styled from "styled-components";
import MeanCoffeeHeader from "../components/shop-components/MeanCoffeeHeader";
import CartFooter from "../components/shop-components/CartFooter";
import ItemCardList from "../components/shop-components/ItemCardList";
import ItemCard from "../components/shop-components/ItemCard";
import { Button } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import customFetch from "../lib/customFetch";
import uuidv4 from "uuid/v4";

const ShopPage = () => {
  const [merchandise, setMerchandise] = useState([]);
  const {
    cartItems,
    setCartItems,
    deleteCartItem,
    addCartItem
  } = useCartItem();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const { data } = customFetch("http://localhost:2019/shop", setMerchandise);
    fetch(
      `http://localhost:2019/cart/user/username/${window.localStorage.getItem(
        "username"
      )}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("access_token"),
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    ).then(res => {
      const json = res.json();
      json.then(res => {
        console.log(res);
        setUserId(res.userid);
      });
    });
  }, []);

  // console.log(merchandise);
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
                      addCartItem(item, userId);
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
    const deleteIndex = cartItems.findIndex(item => {
      return item.keyId === id;
    });

    setCartItems([
      ...cartItems.slice(0, deleteIndex),
      ...cartItems.slice(deleteIndex + 1)
    ]);
  };
  const addCartItem = (itemObj, userId) => {
    // console.log(itemObj);
    const keyId = uuidv4();
    const response = fetch(
      `http://localhost:2019/cart/addtocart/${userId}/${itemObj.productid}/1`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer " + window.localStorage.getItem("access_token"),
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    ).then(res => {
      const json = res.json();
      json.then(res => {});
    });
    const newItem = {
      ...itemObj,
      keyId
    };
    // console.log(cartItems);
    setCartItems([...cartItems, newItem]);
  };

  return {
    cartItems,
    setCartItems,
    deleteCartItem,
    addCartItem
  };
};
const MainContent = styled.main`
  padding: 0.5em;
`;
const ShopWrapper = styled.div``;
export default ShopPage;
