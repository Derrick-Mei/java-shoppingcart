import styled from "styled-components";
import MeanCoffeeHeader from "../components/shop-components/MeanCoffeeHeader";
import CartFooter from "../components/shop-components/CartFooter";
import ItemCardList from "../components/shop-components/ItemCardList";
import ItemCard from "../components/shop-components/ItemCard";
import { Button } from "antd";

const ShopPage = () => {
  return (
    <ShopWrapper>
      <MeanCoffeeHeader />
      <MainContent>
        <ItemCardList>
          <ItemCard
            actionBtn={
              <Button type="primary" onClick={() => console.log("buy")}>
                Buy
              </Button>
            }
          />
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
