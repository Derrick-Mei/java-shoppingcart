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
                  <Button type="primary" onClick={() => console.log("buy")}>
                    Buy {`$${item.price}`}
                  </Button>
                }
              />
            );
          })}
        </ItemCardList>
      </MainContent>
      <CartFooter />
    </ShopWrapper>
  );
};

const MainContent = styled.main`
  padding: 0.5em;
`;
const ShopWrapper = styled.div``;
export default ShopPage;
