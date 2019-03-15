import styled from "styled-components";

interface Props {
    children: React.ReactNode,
}
 
const ItemCardList: React.SFC<Props> = props => {
  return <ItemsWrapper>{props.children}</ItemsWrapper>;
};
const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  z-index: -1;
`;
export default ItemCardList;
