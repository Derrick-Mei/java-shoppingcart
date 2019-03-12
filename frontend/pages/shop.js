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
import { baseAxios, createBearerAxios } from "../lib/axiosInstances";
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
    baseAxios.get("/shop").then(({data}) => {
      setMerchandise(data);
    }).catch(err => {
      console.log(err);
    });
    createBearerAxios()({
      method: "get",
      url: `/cart/user/username/${window.localStorage.getItem("username")}`,
      transformResponse: function(data) {
        return { "userid": JSON.parse(data)["userid"] };
      }
    }).then(({ data }) => {
      setUserId(data.userid)
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
      <CartFooter
        cartItems={cartItems}
        deleteCartItem={deleteCartItem}
        userId={userId}
      />
    </ShopWrapper>
  );
};
const useCartItem = () => {
  const [cartItems, setCartItems] = useState([]);

  const deleteCartItem = (currItem, userId) => {
    const deleteIndex = cartItems.findIndex(item => {
      return item.keyId === currItem.keyId;
    });
    fetch(`http://localhost:2019/cart/${userId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("access_token"),
        // "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    }).then(res => {
      const json = res.json();
      json.then(res => {
        const cartItem = res.find(
          item => item.productid === currItem.productid
        );
        console.log(cartItem.quantityincart);
        setTimeout(() => {
          fetch(
            `http://localhost:2019/cart/modifyquantityincart/${userId}/${
              currItem.productid
            }/${cartItem.quantityincart - 1}`,
            {
              method: "PUT",
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
        });
      }, 1000);
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
