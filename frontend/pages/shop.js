import styled from "styled-components";
import MeanCoffeeHeader from "../components/shop-components/MeanCoffeeHeader";
import CartFooter from "../components/shop-components/CartFooter";
import ItemCardList from "../components/shop-components/ItemCardList";
import ItemCard from "../components/shop-components/ItemCard";
import ReviewDrawer from "../components/shop-components/ReviewDrawer";
import Searcher from "../components/shop-components/Searcher";
import {Button, Spin, notification} from "antd";
import {useEffect, useState, useMemo} from "react";
import axios from "axios";
import uuidv4 from "uuid/v4";
import {createBaseAxios, createBearerAxios} from "../lib/axiosInstances";
import {formatMoney} from "../lib/formatMoney";
import Router from "next/router";
import {
  getCustomerByUsername,
  getCustomerByUserId,
  getCartByUserId,
  getShopMerchandise,
  getShopItemsByPage,
  postAddCartItem,
  deleteCartItemByUserIdAndProductId,
  deleteCartItemRequest,
  putModifyCartQuantity,
} from "../lib/requestsEndpoints/index";

const ShopPage = () => {
  const [merchandise, setMerchandise] = useState([]);
  const [merchandiseFromSearch, setMerchandiseFromSearch] = useState([]);
  const [isItemsLoading, setItemsLoading] = useState(false);
  const [isReviewsPaneVisible, setReviewsPaneVisible] = useState(false);
  const [merchandisePage, setMerchandisePage] = useState(2);
  const [isPaginatorLoading, setIsPaginatorLoading] = useState(false);
  const [isPaginatorDisabled, setIsPaginatorDisabled] = useState(true);
  const {
    cartItems,
    setCartItems,
    deleteCartItem,
    addCartItem,
  } = useCartItem();
  const [userId, setUserId] = useState();
  const [accessToken, setAccessToken] = useState("");
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
  const getNextPageMerchandise = async () => {
    setIsPaginatorLoading(true);
    const nextMerchandiseData = await getShopItemsByPage(merchandisePage);
    setMerchandise([...merchandise, ...nextMerchandiseData]);
    setMerchandisePage(merchandisePage + 1);
    setIsPaginatorDisabled(
      nextMerchandiseData.length === 0 ? true : false,
    );
    setIsPaginatorLoading(false);
  };
  const decideMerchandiseToShow = () => {
    return merchandiseFromSearch.length > 0
      ? merchandiseFromSearch
      : merchandise;
  };
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setItemsLoading(true);
        const merchandiseData = await getShopItemsByPage(1);
        console.log(merchandiseData);
        setMerchandise(merchandiseData);
        setIsPaginatorDisabled(
          merchandiseData.length === 0 ? true : false,
        );
      } catch (err) {
        console.log(err);
        notification.error({
          message:
            "Failed to fetch merchandise, it might be a server error try again.",
        });
      } finally {
        setItemsLoading(false);
      }
    };
    fetchItems();
    setAccessToken(window.localStorage.getItem("access_token"));
  }, []);

  useEffect(() => {
    const fetchUserAndCart = async () => {
      try {
        const username = window.localStorage.getItem("username");
        const customerData = await getCustomerByUsername(username);
        setUserId(customerData.userId);

        window.localStorage.setItem("userid", customerData.userId);
        const {itemsInCart} = customerData.cart;
        const modifiedCartItems = [];
        for (let i = 0; i < itemsInCart.length; i++) {
          const {product} = itemsInCart[i];
          modifiedCartItems.push({
            ...product,
            keyId: uuidv4(),
          });
        }
        console.log(modifiedCartItems);
        setCartItems(modifiedCartItems);
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
                {decideMerchandiseToShow().map(item => {
                  return (
                    <ItemCard
                      key={item.productId}
                      title={item.productName}
                      description={item.description}
                      imagePublicId={item.image}
                      imageHeight={200}
                      imageWidth={200}
                      actionBtns={[
                        <BuyBtn
                          type="primary"
                          onClick={() => {
                            addCartItem(item, userId);
                          }}
                          access_token={accessToken}
                        >
                          Buy {formatMoney(item.price)}
                        </BuyBtn>,
                        <LoginBtn
                          type="primary"
                          onClick={() => {
                            Router.push({
                              pathname: "/auth",
                            });
                          }}
                          access_token={accessToken}
                        >
                          Login to buy.
                        </LoginBtn>,
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
          [merchandise, userId, isItemsLoading, merchandiseFromSearch],
        )}
        <PaginateBtn
          disabled={isPaginatorDisabled}
          type="primary"
          onClick={() => {
            getNextPageMerchandise();
          }}
          loading={isPaginatorLoading}
          search_merchandise={merchandiseFromSearch}
        >
          Load Next Page
        </PaginateBtn>
      </MainContent>
      <CartFooter
        cartItems={cartItems}
        deleteCartItem={deleteCartItem}
        userId={userId}
      />
      <Searcher setMerchandiseFromSearch={setMerchandiseFromSearch} />
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

  const deleteCartItem = async (currItem, userId, deleteIndex) => {
    const {cart} = await getCustomerByUserId(userId);
    const {itemsInCart} = cart;

    const cartItem = itemsInCart.find(item => {
      return item.product.productId === currItem.productId;
    });
    if (cartItem.quantity > 1) {
      const modifySuccessMsg = notification.success.bind(null, {
        message: `Deleted ${
          cartItem.product.productName
        }, there are ${cartItem.quantity - 1} left in cart.`,
      });
      const modifyFailedMsg = notification.error.bind(null, {
        message: `Deletion of ${
          cartItem.product.productName
        } has failed, try again later...`,
      });
      const data = await putModifyCartQuantity(
        userId,
        cartItem.product.productId,
        cartItem.quantity - 1,
        modifySuccessMsg,
        modifyFailedMsg,
      );
      if (data.status !== "error") {
        setCartItems([
          ...cartItems.slice(0, deleteIndex),
          ...cartItems.slice(deleteIndex + 1),
        ]);
      }
    } else if (cartItem.quantity <= 1) {
      const deleteSuccessMsg = notification.success.bind(null, {
        message: `${
          cartItem.product.productName
        } no longer exists in cart, delete successful!`,
      });
      const deleteFailedMsg = notification.error.bind(null, {
        message: `${
          cartItem.product.productName
        } could not be deleted, try again later.`,
      });
      const data = await deleteCartItemRequest(
        userId,
        cartItem.product.productId,
        deleteSuccessMsg,
        deleteFailedMsg,
      );
      if (data.status !== "error") {
        setCartItems([
          ...cartItems.slice(0, deleteIndex),
          ...cartItems.slice(deleteIndex + 1),
        ]);
      }
    }
  };

  const addCartItem = async (itemObj, userId) => {
    const displaySuccessMsg = notification.success.bind(null, {
      message: `${itemObj.productName} has been added!`,
    });
    const displayFailedMsg = notification.error.bind(null, {
      message: `${itemObj.productName} has failed to be added to cart.`,
    });
    const data = await postAddCartItem(
      userId,
      itemObj.productId,
      displaySuccessMsg,
      displayFailedMsg,
    );
    if (data.status !== "error") {
      const newItem = {
        ...itemObj,
        keyId: uuidv4(),
      };
      setCartItems(prevState => [...prevState, newItem]);
    }
  };

  return {
    cartItems,
    setCartItems,
    deleteCartItem,
    addCartItem,
  };
};
const MainContent = styled.main`
  display: block;
  margin: 0 auto;
  padding: 5em 0.5em 8em 0.5em;
  text-align: center;
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
const BuyBtn = styled(Button)`
  display: ${props => (props.access_token ? "flex" : "none")};
  justify-content: center;
`;
const LoginBtn = styled(Button)`
  display: ${props => (props.access_token ? "none" : "flex")};
  justify-content: center;
`;
const PaginateBtn = styled(Button)`
  display: ${props => (props.search_merchandise.length > 0 ? "none" : "")};
`;
export default ShopPage;
