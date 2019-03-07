import styled from "styled-components";
import MeanCoffeeHeader from "../components/shop-components/MeanCoffeeHeader";
import CartFooter from "../components/shop-components/CartFooter";
import ItemCardList from "../components/shop-components/ItemCardList";
import ItemCard from "../components/shop-components/ItemCard";
import { Button } from "antd";
import fetch from "isomorphic-unfetch";
import { useEffect, useState } from "react";

const ShopPage = () => {
  const [merchandise, setMerchandise] = useState([]);

  async function fetchMerchandise() {
    let url = "http://localhost:2019/merchandise";
    const response = await fetch(url);
    const json = await response.json();
    setMerchandise(json);
    return { merchandise };
  }

  useEffect(() => {
    const { merchandise } = fetchMerchandise();
  }, []);
  console.log(merchandise);
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

ShopPage.getInitialProps = async ({ req }) => {
  const res = await fetch("http://localhost:2019/merchandise");
  const json = await res.json();
  return { merchandise: json };
};
const MainContent = styled.main`
  padding: 0.5em;
`;
const ShopWrapper = styled.div``;
export default ShopPage;
