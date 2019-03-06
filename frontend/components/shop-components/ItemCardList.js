import styled from "styled-components";
import ItemCard from "./ItemCard";

const ItemCardList = props => {
  return <ItemsWrapper>{props.children}</ItemsWrapper>;
};
const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: -1;
  margin: 100px 0 0 0;
`;
export default ItemCardList;
