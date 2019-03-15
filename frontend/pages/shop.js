import styled from "styled-components";
import MeanCoffeeHeader from "../components/shop-components/MeanCoffeeHeader";
import CartFooter from "../components/shop-components/CartFooter";
import ItemCardList from "../components/shop-components/ItemCardList";
import ItemCard from "../components/shop-components/ItemCard";
import { Button } from "antd";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import uuidv4 from "uuid/v4";
import { baseAxios, createBearerAxios } from "../lib/axiosInstances";
import {formatMoney} from "../lib/formatMoney";
import { Spin } from "antd";
const ShopPage = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [isItemsLoading, setItemsLoading] = useState(false);
  const {
    cartItems,
    setCartItems,
    deleteCartItem,
    addCartItem
  } = useCartItem();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      try {
      setItemsLoading(true);
      const { data } = await baseAxios({method: "get", url: "/shop"});
      setMerchandise(data);
      setItemsLoading(false);
      }
      catch(err) {
        console.log(err);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
      const { data: userData } = await createBearerAxios()({
        method: "get",
        url: `/cart/user/username/${window.localStorage.getItem("username")}`,
      });
      setUserId(userData.userid);

      const { data: cartData } = await createBearerAxios()({
        method: "get",
        url: `/cart/${userData.userid}`
      });
      const productsData = cartData;
      const cartItems = [];
        for(let i = 0; i < productsData.length; i++) {
          let product = productsData[i];
          const quantity = product.quantityincart;

          for(let j = 0; j < quantity; j++) {
            delete product.quantityincart;
        cartItems.push({
              ...product,
          keyId: uuidv4()
            })
          } // for j - used for adding the right amount of quantity in cart
        } // for i - iterating through each product
        setCartItems(cartItems);
    }
    catch(err) {
      console.log(err);
    }
  }
  fetchUserAndCart();
  }, []);

  // console.log(merchandise);
  return (
    <ShopWrapper>
      <MeanCoffeeHeader />
      <MainContent>
         {useMemo (() => isItemsLoading ? <ItemsListSpinner size="large"/> : <ItemCardList>
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
                    Buy {formatMoney(item.price)}
                  </Button>
                }
              />
            );
          })}
        </ItemCardList>, [merchandise, isItemsLoading])}
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
    
    createBearerAxios()({
      method: "get",
      url: `/cart/${userId}`,
      transformResponse: function (data) {
        const specificProduct = JSON.parse(data)
        .filter(product => {
          return product.productid === currItem.productid;
        });
        return { newQuantityInCart: specificProduct[0].quantityincart - 1}
      },
    }).then(({data}) => {
      createBearerAxios()({
        method: "put",
        url: `/cart/modifyquantityincart/${userId}/${currItem.productid}/${data.newQuantityInCart}`
      }).then(({data}) => {
    const deleteIndex = cartItems.findIndex(item => {
      return item.keyId === currItem.keyId;
    });
    setCartItems([
      ...cartItems.slice(0, deleteIndex),
      ...cartItems.slice(deleteIndex + 1)
    ]);
      });
    }).catch(err => {
      console.log(err, " - GET /cart/${userid} error")
    });
  };

  const addCartItem = (itemObj, userId) => {
    console.log(cartItems)
    createBearerAxios()({
      method: "post",
      url: `/cart/addtocart/${userId}/${itemObj.productid}/1`,
    }).then(({ data }) => {
      console.log(data);
    const newItem = {
      ...itemObj,
        keyId: uuidv4()
    };
    setCartItems(prevState => [...prevState, newItem]);
    }).catch((err) => {
      console.log(err, " POST to cart");
    })
  };

  return {
    cartItems,
    setCartItems,
    deleteCartItem,
    addCartItem
  };
};
const MainContent = styled.main`
  padding: 5em 0.5em;
`;
const ShopWrapper = styled.div`
`;

const ItemsListSpinner = styled(Spin)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateY(30%);
  justify-content: center;
`;
export default ShopPage;
