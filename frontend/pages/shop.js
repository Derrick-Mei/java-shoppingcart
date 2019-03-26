import styled from "styled-components";
import MeanCoffeeHeader from "../components/shop-components/MeanCoffeeHeader";
import CartFooter from "../components/shop-components/CartFooter";
import ItemCardList from "../components/shop-components/ItemCardList";
import ItemCard from "../components/shop-components/ItemCard";
import {Button} from "antd";
import {useEffect, useState, useMemo} from "react";
import axios from "axios";
import uuidv4 from "uuid/v4";
import {createBaseAxios, createBearerAxios} from "../lib/axiosInstances";
import {formatMoney} from "../lib/formatMoney";
import {Spin} from "antd";
import ReviewDrawer from "../components/shop-components/ReviewDrawer";
import Searcher from "../components/shop-components/Searcher";
import getCustomerByUserId from "../lib/requestsEndpoints/getCustomerByUserId";
import {notification} from "antd";
import getCustomerByUsername from "../lib/requestsEndpoints/getCustomerByUsername";
import getCartByUserId from "../lib/requestsEndpoints/getCartByUserId";
import getShopMerchandise from "../lib/requestsEndpoints/getShopMerchandise";
import postAddCartItem from "../lib/requestsEndpoints/postAddCartItem";

const ShopPage = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [isItemsLoading, setItemsLoading] = useState(false);
  const [isReviewsPaneVisible, setReviewsPaneVisible] = useState(false);
  const {
    cartItems,
    setCartItems,
    deleteCartItem,
    addCartItem,
  } = useCartItem();
  const [userId, setUserId] = useState();
  const commentsData = [
    {
      avatar: "",
      commentText: "This product is awesome!",
      rating: 5,
      keyId: 1,
      author: "John",
    },
    {
      avatar: "",
      commentText: "This product is alright",
      rating: 3,
      keyId: 2,
      author: "herald",
    },
  ];
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setItemsLoading(true);
        const merchandiseData = await getShopMerchandise();
        setMerchandise(merchandiseData);
        setItemsLoading(false);
      } catch (err) {
        console.log(err);
        notification.error({
          message:
            "Failed to fetch merchandise, it might be a server error try again.",
        });
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const username = window.localStorage.getItem("username");
        const customerData = await getCustomerByUsername(username);

        setUserId(customerData.userid);

        window.localStorage.setItem("userid", customerData.userid);

        const cartData = await getCartByUserId(customerData.userid);
        const cartItems = [];
        for (let i = 0; i < cartData.length; i++) {
          let item = cartData[i];
          const quantity = item.quantityincart;

          for (let j = 0; j < quantity; j++) {
            delete item.quantityincart;
            cartItems.push({
              ...item,
              keyId: uuidv4(),
            });
          } // for j - used for adding the right amount of quantity in cart
        } // for i - iterating through each product
        setCartItems(cartItems);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserAndCart();
  }, [userId]);

  // console.log(merchandise);
  return (
    <ShopWrapper>
      <MeanCoffeeHeader />
      <MainContent>
        {useMemo(
          () =>
            isItemsLoading ? (
              <ItemsListSpinner size="large" />
            ) : (
              <ItemCardList>
                {merchandise.map(item => {
                  return (
                    <ItemCard
                      key={item.productid}
                      title={item.productname}
                      description={item.description}
                      imagePublicId={item.image}
                      imageHeight={200}
                      imageWidth={200}
                      actionBtns={[
                        <Button
                          type="primary"
                          onClick={() => {
                            addCartItem(item, userId);
                          }}
                        >
                          Buy {formatMoney(item.price)}
                        </Button>,
                        <Button
                          onClick={() => {
                            setReviewsPaneVisible(prevState => !prevState);
                          }}
                        >
                          Reviews
                        </Button>,
                      ]}
                    />
                  );
                })}
              </ItemCardList>
            ),
          [merchandise, userId, isItemsLoading],
        )}
      </MainContent>
      <CartFooter
        cartItems={cartItems}
        deleteCartItem={deleteCartItem}
        userId={userId}
      />
      <Searcher />
      <ReviewDrawer
        isVisible={isReviewsPaneVisible}
        commentsData={commentsData}
        setVisible={setReviewsPaneVisible}
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
      transformResponse: function(data) {
        const specificProduct = JSON.parse(data).filter(product => {
          return product.productid === currItem.productid;
        });
        return {
          newQuantityInCart: specificProduct[0].quantityincart - 1,
        };
      },
    })
      .then(({data}) => {
        createBearerAxios()({
          method: "put",
          url: `/cart/modifyquantityincart/${userId}/${
            currItem.productid
          }/${data.newQuantityInCart}`,
        }).then(({data}) => {
          const deleteIndex = cartItems.findIndex(item => {
            return item.keyId === currItem.keyId;
          });
          setCartItems([
            ...cartItems.slice(0, deleteIndex),
            ...cartItems.slice(deleteIndex + 1),
          ]);
        });
      })
      .catch(err => {
        console.log(err, " - GET /cart/${userid} error");
      });
  };

  const addCartItem = async (itemObj, userId) => {
    const displaySuccessMsg = notification.success.bind(null, {
      message: `${itemObj.productname} has been added!`,
    });
    const displayFailedMsg = notification.error.bind(null, {
      message: `${itemObj.productname} has failed to be added to cart.`,
    });
    const data = await postAddCartItem(
      userId,
      itemObj.productid,
      displaySuccessMsg,
      displayFailedMsg,
    );
    const newItem = {
      ...itemObj,
      keyId: uuidv4(),
    };
    setCartItems(prevState => [...prevState, newItem]);
  };

  return {
    cartItems,
    setCartItems,
    deleteCartItem,
    addCartItem,
  };
};
const MainContent = styled.main`
  padding: 5em 0.5em;
`;
const ShopWrapper = styled.div``;

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
